# Current Scope

Die erste Ausbaustufe fokussiert auf lokalen JSON-Import, strukturierte Bearbeitung der wichtigsten DeviceConfig-Bereiche inklusive Achsen, Hinzufügen, Entfernen und Umsortieren zentraler Listeneinträge, lokale Änderungshistorie, schema-basierte Enum-Dropdowns, Rohdatenbearbeitung, Schema- und Querverweisprüfung sowie JSON-Export.

Die Architektur ist jetzt für die schrittweise Migration zu XTom Studio aufgeteilt: Der Browser-Editor verwendet die Verträge für Configuration, Schema, Validation und Export über lokale Adapter. XTom Server und XFlow sind als getrennte Gateway-Grenzen beschrieben; die produktive Remote-Kommunikation, Authentifizierung und End-to-End-Ausführung bleiben der nächste Integrationsschritt.
