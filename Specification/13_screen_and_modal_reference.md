# Screen and Modal Reference

## Hauptbildschirm

Der Hauptbildschirm besteht aus Topbar, linker Bereichsnavigation und einem zentralen Editor. Ohne geladene Konfiguration wird ein Empty State mit Öffnen- und Beispiel-laden-Aktion angezeigt.

Enum-Felder aus `json-devices-schema.json` erscheinen in den strukturierten Bereichen als Dropdowns. Die Auswahl wird unmittelbar in die JSON-Struktur geschrieben. Die Prüfung meldet fehlende Pflichtfelder, falsche Datentypen, ungültige Enum-Werte sowie Werte außerhalb von Minimum/Maximum und MinLength/MinItems.

Wenn die Schema-Datei im lokalen `file://`-Modus nicht geladen werden kann, verwendet die Oberfläche die bekannten Enum-Definitionen als Fallback und meldet keinen technischen Schema-Ladefehler.

Listenbereiche besitzen eine Hinzufügen-Aktion. Neue Einträge werden direkt in der jeweiligen Liste angelegt und anschließend im gleichen Formular bearbeitet.

Die strukturierten Karten zeigen ihre unterstützten Felder vollständig. Fehlende optionale Werte werden als leere Eingaben beziehungsweise als nicht gesetzte Auswahl dargestellt.

## Rohdaten-Dialog

Der Dialog „Rohdaten bearbeiten“ zeigt die vollständige JSON-Struktur. „Übernehmen“ akzeptiert ausschließlich syntaktisch gültiges JSON; bei Fehlern bleibt der Dialog geöffnet und zeigt eine Fehlermeldung.
