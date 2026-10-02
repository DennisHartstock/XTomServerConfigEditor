# Screen and Modal Reference

## Hauptbildschirm

Der Hauptbildschirm besteht aus Topbar, linker Bereichsnavigation und einem zentralen Editor. Ohne geladene Konfiguration wird ein Empty State mit Öffnen- und Beispiel-laden-Aktion angezeigt.

Enum-Felder aus `json-devices-schema.json` erscheinen in den strukturierten Bereichen als Dropdowns. Die Auswahl wird unmittelbar in die JSON-Struktur geschrieben. Die Prüfung meldet fehlende Pflichtfelder, falsche Datentypen, ungültige Enum-Werte sowie Werte außerhalb von Minimum/Maximum und MinLength/MinItems.

Zusätzlich prüft die Validierung die fachlichen Querverweise zwischen Startup-Geräten, Achsen, Controllern und AxisNodes.

Wenn die Schema-Datei im lokalen `file://`-Modus nicht geladen werden kann, verwendet die Oberfläche die bekannten Enum-Definitionen als Fallback und meldet keinen technischen Schema-Ladefehler.

Listenbereiche besitzen eine Hinzufügen-Aktion. Neue Einträge werden direkt in der jeweiligen Liste angelegt und anschließend im gleichen Formular bearbeitet.

Die Achsenliste unter „Achsen & Kollision“ besitzt eigene Hinzufügen- und Entfernen-Aktionen. Neue Achsen werden in `AxesConfiguration.Axes` gespeichert.

Die strukturierten Karten zeigen ihre unterstützten Felder vollständig. Fehlende optionale Werte werden als leere Eingaben beziehungsweise als nicht gesetzte Auswahl dargestellt.

Die Startup-Karten bieten Auf- und Ab-Aktionen. Die erste beziehungsweise letzte Karte deaktiviert die jeweils nicht mögliche Richtung.

Die Topbar enthält Rückgängig-/Wiederholen-Aktionen. Beim Verlassen mit ungespeicherten Änderungen warnt der Browser vor Datenverlust.

Aktionen, die die aktuelle Konfiguration ersetzen, zeigen zusätzlich eine Bestätigungsabfrage, wenn Änderungen ungespeichert sind.

## Rohdaten-Dialog

Der Dialog „Rohdaten bearbeiten“ zeigt die vollständige JSON-Struktur. „Übernehmen“ akzeptiert ausschließlich syntaktisch gültiges JSON; bei Fehlern bleibt der Dialog geöffnet und zeigt eine Fehlermeldung.

## Service-Grenze

Der Hauptbildschirm ist der Client des `studio-ui`-Service. Konfigurationen werden über den `configuration-service`-Vertrag geladen und ersetzt, Schema und Enum-Katalog kommen vom `schema-service`, die Prüfung gehört zum `validation-service`, und Speichern nutzt den `export-service`.

Im statischen oder `file://`-Betrieb werden diese Verträge durch lokale Adapter erfüllt. Diese Adapter sind austauschbar; eine spätere XTom-Studio-Installation kann sie durch HTTP-Clients ersetzen, ohne Navigation oder Karten zu verändern. XTom Server und XFlow werden ausschließlich über getrennte Gateway-Grenzen angebunden.
