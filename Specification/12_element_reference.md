# Element Reference

## DeviceConfig Studio

Die erste UI-Version stellt einen Browser-Editor für DeviceConfig-JSON bereit. Die Navigation bietet die Bereiche Übersicht, Host-Konfiguration, Geräte, Achsen & Kollision, Messungen, Startup-Reihenfolge und Assemblies.

### XFlow-Designsprache

- Die Oberfläche übernimmt die XFlow-Tokens: Roboto, `#F5F5F5` als Arbeitsflächenhintergrund, LK Blue `#002F6C` für Primäraktionen und `#001B3D` für die dunkle AppBar.
- Die Navigation wird als schwebende weiße Sidenav mit 16 px Außenabstand, 250 px Breite, 12 px Radius und aktivem blauem Eintrag dargestellt.
- Editor-Karten, Empty State und Dialoge verwenden weiße Paper-Flächen, 12 px Radius und die XFlow-kompatible dezente Schattenhierarchie. Die responsive Navigation bleibt funktional identisch.
- Die linke Konfigurationsnavigation verwendet eine Explorer-Baumstruktur mit Root-Knoten `DeviceConfig`, aufklappbaren Gruppenknoten und eingerückten Blattknoten. Chevron- und Ordnerzustand zeigen die Expansion an; Blattknoten wechseln den aktiven Editor-Bereich.
- Ghost-Buttons in der dunklen AppBar verwenden transparente Flächen und helle Icons/Text; deaktivierte Undo-/Redo-Buttons bleiben sichtbar, werden aber gedimmt.

### Bearbeitungsregeln

- Text-, Zahlen- und Boolean-Felder werden direkt bei der Eingabe in das interne Modell übernommen.
- Schema-Werte mit `enum` werden dynamisch aus dem versionierten Vertrag `Contracts/DeviceConfig/v1/device-config.schema.json` gelesen und als Dropdown dargestellt. Kamera-Streams werden im Host-Bereich ebenfalls strukturiert bearbeitet.
- Änderungen markieren die Datei als „ungespeichert“.
- Geräte- und Assembly-Einträge können entfernt werden.
- Neue Kamera-, Detektor-, Quellen-, Systemgeräte-, Assembly- und Startup-Einträge können mit schema-kompatiblen Standardwerten angelegt werden.
- Das versionierte Schema beschreibt zusätzlich Messungsoptionen, Messungs-Creator, Detektor-/Quellen-Basisfelder sowie Stage-Controller und AxisNode-Referenzen. Gerätespezifische Creator-Felder bleiben erweiterbar und werden serverseitig gegen den konkreten `$type` geprüft.
- Im Bereich „Achsen & Kollision“ können neue Achsen mit Standardtyp und editierbaren Controller-/AxisNode-Referenzen angelegt oder entfernt werden.
- Relevante optionale Felder werden auch dann angezeigt, wenn sie im geladenen JSON noch fehlen, und können direkt ergänzt werden.
- Startup-Einträge können mit Auf-/Ab-Aktionen direkt in ihrer Reihenfolge verschoben werden.
- Änderungen können über Rückgängig/Wiederholen beziehungsweise `Ctrl+Z`/`Ctrl+Y` korrigiert werden.
- Das Öffnen einer anderen Datei, das Laden des Beispiels oder das Anlegen einer neuen Konfiguration fragt bei ungespeicherten Änderungen nach Bestätigung.
- Rohdaten können über einen Advanced-Dialog bearbeitet und wieder übernommen werden.
- Zahlenfelder und Pflichtfelder werden bei der Prüfung gegen die im Schema definierten Grenzen geprüft.
- Geräteverweise in Startup und Achsen werden gegen bekannte DeviceId-, ControllerId- und AxisNode-Werte geprüft.
- Wird die Anwendung direkt als `file://` geöffnet, stehen die bekannten Enum-Auswahlen über einen eingebauten Fallback weiterhin zur Verfügung.
- Öffnen und Speichern erfolgen über lokale JSON-Dateien; Speichern lädt eine formatierte JSON-Datei herunter.
- Die UI greift für Konfigurationslebenszyklus, Schemaauflösung und Export über `StudioServices` auf getrennte Serviceverträge zu. Im lokalen Browsermodus werden dafür lokale Adapter verwendet; der Editor hängt nicht direkt von einem konkreten XTom-Server ab.
- Der Export-Service setzt den Ungespeichert-Status erst nach Übergabe an den Browser-Download zurück.
- Neue Konfigurationen tragen den `$schema`-Verweis des versionierten DeviceConfig-Vertrags. Ein Schema-Fallback ist nur ein lokaler Kompatibilitätsmodus und darf keinen anderen Vertrag stillschweigend ersetzen.
- Der Export normalisiert den `$schema`-Verweis auch bei älteren geladenen Profilen auf den aktuellen versionierten Vertrag; die laufende Editing-Session wird dadurch nicht stillschweigend umgeschrieben.
- Der Bereich „Messungen“ bearbeitet `MeasurementOptions.RingCorrectionJsonOptions.PixelShift` sowie `$type` und `MeasurementName` der Messungs-Creator. Zusätzliche Creator-Felder bleiben im Rohdaten-Dialog verfügbar.
