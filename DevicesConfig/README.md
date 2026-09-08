# Device configuration notes

## Extended detector

`DetectorExtended` is an XTomServer detector facade. It controls an existing
physical detector and a horizontal detector-translation axis, acquires one
image at each configured FOV position and stitches the images into one wider
projection.

The physical detector and translation axis must appear before the extended
detector in `SystemConfiguration`, because the facade resolves already
initialized devices during startup.

```json
{
  "$type": "DetectorExtended",
  "DeviceId": "XRayDetectorExtended",
  "OriginalDetectorId": "XRayDetector",
  "DetectorTranslationAxisId": "Det_TransX",
  "DetectorCenter": 0.0,
  "MinimumPixelOverlap": 48,
  "BorderWidthInMillimeters": 2.0,
  "PositioningTimeSeconds": 1.0,
  "DeviceConfiguration": {
    "Source": "XRaySource",
    "SpecRotY": "Spec_RotY",
    "DetTransZ": "Det_TransZ",
    "SpecTransX": "Spec_TransX",
    "SpecTransY": "Spec_TransY",
    "SpecTransZ": "Spec_TransZ"
  }
}
```

The available modes are published through `FOVExtensionsMonitor`; the active
mode is published through `ActualFOVExtensionMonitor` and selected with
`SetFOVExtensionCommand`. The selected FOV mode is also part of the detector's
versioned machine-setup snapshot.

## Detector image-processing backend

Every detector can select its processing backend in the machine configuration:

```json
{
  "$type": "DetectorTest",
  "DeviceId": "XRayDetector",
  "ImageProcessingBackend": "OpenCv"
}
```

Supported values are:

- `Cuda`: require the CUDA/NPP path and report initialization failures.
- `OpenCv`: use CPU processing for acquisition, averaging, dark/flat-field,
  simple and clustered bad-pixel correction, image healing, rotation, shift,
  crop and flip.
- `Auto`: prefer CUDA and fall back to OpenCV when CUDA cannot be initialized.

The legacy `UseGPU` boolean remains supported when
`ImageProcessingBackend` is omitted. New configurations should use the enum.

`XTomMathLib.dll` is the CUDA-free core. It contains the backend-neutral image
contracts and the OpenCV implementation. `XTomMathLib.Cuda.dll` is an optional
plugin containing the CUDA/NPP implementation and is loaded only when `Cuda` or
`Auto` selects it. A deployment without the plugin, CUDA runtime, NPP or an
NVIDIA driver therefore supports `OpenCv` normally. `Auto` falls back to
OpenCV when the optional plugin or its native dependencies are unavailable.

The server loads the CUDA plugin explicitly from `AppContext.BaseDirectory`.
In a regular GPU build, MSBuild copies `XTomMathLib.Cuda.dll`,
`GPUImageProcLib.dll` and the required CUDA/NPP runtime files into the exact
server target directory, including RID-specific `win-x64` output. Core and
plugin must always be deployed from the same build. Selecting `Cuda` reports a
missing or incompatible plugin as a configuration error; selecting `Auto`
records the failure and continues with OpenCV.

The regular build includes the CUDA plugin. A CPU-only server package can be
built with:

```text
msbuild XTomServer\XTomServer.csproj /p:Configuration=Release /p:Platform=x64 /p:IncludeCudaBackend=false
```

For a small CPU-only system, set `ImageProcessingBackend` to `OpenCv`. The
preview stream can remain enabled and will use CPU analysis plus JPEG when
NVENC is unavailable. If the client should consume exact detector values
instead, disable `HostConfigurations.DetectorStreams.Preview`; XTom Studio then
falls back to the raw detector stream. Raw snap, raw live, Python consumers and
scan persistence remain lossless and backend-independent in either case.

Recommended deployment checks are:

- GPU package: verify the CUDA plugin and its native dependencies next to
  `XTomServer.exe`, then exercise both `Cuda` and `Auto`.
- CPU package: verify that no CUDA/NPP binaries are present, select `OpenCv`,
  and exercise Snap, Live, calibration, raw streaming and a complete scan.
- Do not copy a plugin from another build or XTomMathLib version into an
  existing package; rebuild and deploy the server project as one unit.

## Sample geometry system device

Machine-wide logical devices are configured in `SystemDevices` and participate
in the same startup list as hardware devices. The experimental
`SampleGeometry` device acquires a short projection series, prepares editable
one-to-eight-cylinder sample envelopes and can publish the selected envelope to
the collision system. Projection count and estimator tuning are configuration
values rather than UI settings. See [Sample geometry prototype](../../docs/SampleGeometry.md)
for the command contract, control requirements and collision-node setup.
Cross-table support is never inferred from generic specimen axes. Configure
both `CrossTableXAxisId` and `CrossTableZAxisId` on this system device only when
the machine actually has a usable cross table (for example
`Spec_RotY_TransX`/`Spec_RotY_TransZ`); omitting both disables manual X/Z centre
editing in clients.

## Virtual FOD/STZ axis

`VirtualFodAxis` exposes the geometrical specimen-translation/FOD coordinate
while coupling the two real Z axes. A positive virtual movement moves both
Tube-Z and detector-Z by the same negative physical distance. The physical
source-detector distance therefore remains constant. Configure the logical axis
under `SystemDevices`:

```json
{
  "$type": "VirtualFodAxis",
  "DeviceId": "Spec_TransZ",
  "SourceTranslationAxisId": "Tube_TransZ",
  "DetectorTranslationAxisId": "Det_TransZ",
  "RemoteAccess": "Full"
}
```

The physical axes and their controller must occur before `Spec_TransZ` in the
`Startup` list. If the virtual axis replaces the public STZ axis, give the real
Tube-Z axis a distinct internal ID and normally set its `RemoteAccess` to
`None` or `ReadOnly`. Optional `MinimumPosition` and `MaximumPosition` further
restrict the dynamic limits calculated from both physical axes.
