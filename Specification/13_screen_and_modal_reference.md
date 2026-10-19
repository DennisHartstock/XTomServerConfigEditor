# Screen and Modal Reference

## Hauptbildschirm

Der Hauptbildschirm besteht aus Topbar, linker Bereichsnavigation und einem zentralen Editor. Ohne geladene Konfiguration wird ein Empty State mit Öffnen- und Beispiel-laden-Aktion angezeigt.

Die visuelle Shell folgt dem XFlow-Projekt: eine dunkelblaue AppBar, eine schwebende weiße Sidenav auf `#F5F5F5` und weiße, abgerundete Editor-Panels. Primäraktionen verwenden LK Blue; Status- und Fehlerfarben folgen den XFlow-Semantikfarben. Die Sidenav zeigt die Konfigurationsbereiche als Windows-Explorer-artigen Baum: `DeviceConfig` ist der Root, Gruppen können expandiert oder eingeklappt werden, und die aktive Blattseite wird blau markiert. Auf schmalen Ansichten wird die Sidenav oberhalb des Inhalts angeordnet und die Kopfzeile darf umbrechen.

Enum-Felder aus `Contracts/DeviceConfig/v1/device-config.schema.json` erscheinen in den strukturierten Bereichen als Dropdowns. Die Auswahl wird unmittelbar in die JSON-Struktur geschrieben. Die Prüfung meldet fehlende Pflichtfelder, falsche Datentypen, ungültige Enum-Werte sowie Werte außerhalb von Minimum/Maximum und MinLength/MinItems.

Zusätzlich prüft die Validierung die fachlichen Querverweise zwischen Startup-Geräten, Achsen, Controllern und AxisNodes.

Bei einer späteren Serverprüfung werden Contract-Version, doppelte DeviceIds,
unbekannte Startup-/Axis-Referenzen, Dependency-Reihenfolge und
treiberspezifische `$type`-Regeln erneut geprüft. Eine erfolgreiche lokale
Prüfung ersetzt diese Serverprüfung nicht.

Eine spätere Remote-Validierungsaktion zeigt die vom XTomServer gelieferten
Fehler gesammelt an und verändert weder das aktive Profil noch den
Ungespeichert-Status des lokalen Drafts.

Die Auswahl eines Profils für den nächsten Serverstart zeigt einen
Serverfehler, wenn das Zielprofil die strukturellen oder fachlichen
Referenzprüfungen nicht besteht; die bisherige Pending-Auswahl bleibt dabei
erhalten.

Der Review-Schritt zeigt vor dem Speichern die vom Server gelieferten
Änderungen als Add/Remove/Change-Liste. Dieser Schritt verändert weder Profil
noch Geräte.

Die Schema-Prüfung berücksichtigt die Top-Level-Bereiche `MeasurementOptions`, `Detectors`, `Sources`, `Measurements`, `AxesConfiguration` und `Startup`. Gerätespezifische Eigenschaften dürfen im Contract als Erweiterung erscheinen; ihre konkrete Gültigkeit wird erst durch XTomServer anhand des `$type` geprüft.

Wenn der versionierte Vertrag im lokalen `file://`-Modus nicht geladen werden kann, verwendet die Oberfläche die bekannten Enum-Definitionen als Fallback und meldet keinen technischen Schema-Ladefehler. Der aktive Contract wird dabei nicht auf eine andere Version umgestellt.

Listenbereiche besitzen eine Hinzufügen-Aktion. Neue Einträge werden direkt in der jeweiligen Liste angelegt und anschließend im gleichen Formular bearbeitet.

Die Achsenliste unter „Achsen & Kollision“ besitzt eigene Hinzufügen- und Entfernen-Aktionen. Neue Achsen werden in `AxesConfiguration.Axes` gespeichert.

Der Bereich „Messungen“ zeigt globale Messungsoptionen und die Liste `Measurements`. Neue Einträge verwenden einen schema-kompatiblen Axial-CT-Creator als Ausgangspunkt und können anschließend über `$type` und `MeasurementName` angepasst werden.

Die strukturierten Karten zeigen ihre unterstützten Felder vollständig. Fehlende optionale Werte werden als leere Eingaben beziehungsweise als nicht gesetzte Auswahl dargestellt.

Die Startup-Karten bieten Auf- und Ab-Aktionen. Die erste beziehungsweise letzte Karte deaktiviert die jeweils nicht mögliche Richtung.

Die Topbar enthält Rückgängig-/Wiederholen-Aktionen. Beim Verlassen mit ungespeicherten Änderungen warnt der Browser vor Datenverlust.

Aktionen, die die aktuelle Konfiguration ersetzen, zeigen zusätzlich eine Bestätigungsabfrage, wenn Änderungen ungespeichert sind.

## Rohdaten-Dialog

Der Dialog „Rohdaten bearbeiten“ zeigt die vollständige JSON-Struktur. „Übernehmen“ akzeptiert ausschließlich syntaktisch gültiges JSON; bei Fehlern bleibt der Dialog geöffnet und zeigt eine Fehlermeldung.

## Service-Grenze

Der Hauptbildschirm ist der Client des `studio-ui`-Service. Konfigurationen werden über den `configuration-service`-Vertrag geladen und ersetzt, Schema und Enum-Katalog kommen vom `schema-service`, die Prüfung gehört zum `validation-service`, und Speichern nutzt den `export-service`.

Im statischen oder `file://`-Betrieb werden diese Verträge durch lokale Adapter erfüllt. Diese Adapter sind austauschbar; eine spätere XTom-Studio-Installation kann sie durch HTTP-Clients ersetzen, ohne Navigation oder Karten zu verändern. XTom Server und XFlow werden ausschließlich über getrennte Gateway-Grenzen angebunden.
