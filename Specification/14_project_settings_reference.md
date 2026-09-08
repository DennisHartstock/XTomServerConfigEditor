# Project Settings Reference

## Laufzeit

Die Anwendung ist als dependency-freier Browser-Editor umgesetzt. `index.html`, `styles.css` und `app.js` werden direkt ausgeliefert; Beispielkonfigurationen liegen unter `DevicesConfig/`.

Die Anwendung kann über einen lokalen Webserver oder direkt als HTML-Datei gestartet werden. Im direkten Dateimodus sind schemaabhängige Detailgrenzen eingeschränkt, die bekannten Dropdown-Auswahlen und die Grundprüfung bleiben verfügbar.

## Export

Der Export schreibt die aktuell bearbeitete Struktur als UTF-8-JSON mit zweistelliger Einrückung und abschließendem Zeilenumbruch. Die Dateiendung ist `.json`.

Der Editor führt für die aktuelle Konfiguration eine lokale Änderungshistorie. Beim Laden einer Datei beginnt eine neue Historie; Speichern setzt nur den Ungespeichert-Status zurück.
