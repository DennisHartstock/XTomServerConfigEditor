# Element Reference

## DeviceConfig Studio

Die erste UI-Version stellt einen Browser-Editor für DeviceConfig-JSON bereit. Die Navigation bietet die Bereiche Übersicht, Host-Konfiguration, Geräte, Achsen & Kollision, Startup-Reihenfolge und Assemblies.

### Bearbeitungsregeln

- Text-, Zahlen- und Boolean-Felder werden direkt bei der Eingabe in das interne Modell übernommen.
- Schema-Werte mit `enum` werden als Dropdown dargestellt: RotationDegrees, Encoder, RemoteAccess, SecurityMode, AuthenticationMode, DataType und Access. Kamera-Streams werden im Host-Bereich ebenfalls strukturiert bearbeitet.
- Änderungen markieren die Datei als „ungespeichert“.
- Geräte- und Assembly-Einträge können entfernt werden.
- Rohdaten können über einen Advanced-Dialog bearbeitet und wieder übernommen werden.
- Öffnen und Speichern erfolgen über lokale JSON-Dateien; Speichern lädt eine formatierte JSON-Datei herunter.
