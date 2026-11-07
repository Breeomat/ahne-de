@echo off
rem Waermepumpen-Bericht vom Vortag auf www.ahne.de/waermepumpe/ veroeffentlichen.
rem In der Windows-Aufgabenplanung taeglich um 01:00 starten. Ausgabe landet in hochladen.log.
cd /d "%~dp0"
echo ==== %date% %time% >> hochladen.log
python waermepumpe_hochladen.py >> hochladen.log 2>&1
