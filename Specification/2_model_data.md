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

The browser's local adapters implement these contracts during offline editing. They are replaceable implementations, not additional persisted model state.
