# UI and Canvas

The DeviceConfig Studio screen remains the editing client in the XTom Studio architecture. It owns navigation, field rendering, local history, and user confirmation flows.

Data operations cross service boundaries through `StudioServices`. The UI must not embed XTom Server or XFlow implementation types. The service manifest is the source of truth for deployable responsibilities and transport choices.

The local adapter mode keeps the existing static-server and `file://` workflows available while remote service implementations are introduced incrementally.
