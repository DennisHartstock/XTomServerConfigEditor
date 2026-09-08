# Screen and Modal Reference

## Hauptbildschirm

Der Hauptbildschirm besteht aus Topbar, linker Bereichsnavigation und einem zentralen Editor. Ohne geladene Konfiguration wird ein Empty State mit Öffnen- und Beispiel-laden-Aktion angezeigt.

Enum-Felder aus `json-devices-schema.json` erscheinen in den strukturierten Bereichen als Dropdowns. Die Auswahl wird unmittelbar in die JSON-Struktur geschrieben. Die Prüfung meldet Werte, die nicht in den Schema-Enums enthalten sind.

## Rohdaten-Dialog

Der Dialog „Rohdaten bearbeiten“ zeigt die vollständige JSON-Struktur. „Übernehmen“ akzeptiert ausschließlich syntaktisch gültiges JSON; bei Fehlern bleibt der Dialog geöffnet und zeigt eine Fehlermeldung.
