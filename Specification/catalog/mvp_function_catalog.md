# MVP Function Catalog

| Capability | Owning boundary | Current adapter |
| --- | --- | --- |
| Open/create/replace DeviceConfig | configuration-service | local browser adapter |
| Schema and enum catalog | schema-service | local JSON fetch adapter |
| Schema and cross-reference checks | validation-service | editor validation adapter |
| Canonical JSON download | export-service | browser download adapter |
| Remote device measurement/action/monitor | xtom-server-gateway | integration boundary defined |
| Workflow dispatch and control lease | xflow-gateway | integration boundary defined |

The schema service currently serves the baseline package
`procon.xtom.device-config@1.0.0` from `Contracts/DeviceConfig/v1`.
`Detectors`, `Sources`, `Measurements`, and `MeasurementOptions` still require
reconciliation with the server model before a remote configuration API is
introduced. XTomServer must reject unsupported contract versions.

The MVP keeps local editing functional. Remote gateways are explicit integration points and are not silently folded into the configuration editor.
