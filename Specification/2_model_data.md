# Model Data

## Configuration session

The editor owns only an editing session: `value`, `name`, `dirty`, and local undo/redo history. The persisted DeviceConfig JSON remains the canonical configuration model.

Service sessions may carry a revision, but transport metadata is not exported unless the DeviceConfig schema explicitly defines it.

## Service contracts

- `configuration-service`: load, replace, create, and revision metadata.
- `schema-service`: JSON Schema and enum catalog.
- `validation-service`: schema validation plus DeviceId, ControllerId, and AxisNodeId reference validation.
- `export-service`: canonical UTF-8 JSON export.
- `xtom-server-gateway`: remote measurement, action, monitor, and configuration-version capabilities.
- `xflow-gateway`: workflow dispatch and control-lease capabilities.

The shared persisted contract is the versioned package `procon.xtom.device-config`.
The current package is `Contracts/DeviceConfig/v1` (`1.0.0`) and contains the
schema plus manifest consumed by the editor and shipped with XTomServer. This
first package is a baseline derived from the existing editor schema; before a
remote save/apply API is enabled it must be reconciled with all properties of
`SystemJsonConfiguration`. The baseline now describes `MeasurementOptions`,
`Detectors`, `Sources`, `Measurements`, `AxesConfiguration`, and `Startup` in
addition to the existing host and system-device sections. The schema describes
transport/UI shape; XTomServer remains authoritative for polymorphic creator
types and runtime dependency invariants.

The browser's local adapters implement these contracts during offline editing. They are replaceable implementations, not additional persisted model state.

Server-side validation is authoritative for version negotiation, polymorphic
creator compatibility, dependency ordering, and driver-specific invariants.
The browser validation remains a fast local diagnostic and must not be treated
as proof that XTomServer will accept a configuration.

The first remote contract operation is `ValidateDeviceConfiguration`. It
accepts the contract ID, contract version, and draft JSON and does not mutate
the active profile.

`GetDeviceConfiguration` and `SaveDeviceConfiguration` provide versioned draft
read/write. Save is atomic, validates before writing, accepts only a safe JSON
file name, and never activates the profile or restarts devices.

`PreviewDeviceConfiguration` is the read-only review operation. It validates a
draft and returns a deterministic property-level diff against a selected base
profile before save.
