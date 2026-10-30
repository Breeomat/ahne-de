import type { Text } from './sprache';

// Visitenkarte mit Lebenslauf (versteckte Seite /visitenkarte/ bzw. /en/business-card/, 5× auf „Marc“ tippen).
// Quellen: Zwischenzeugnis Ahlbrandt (11/2011), IHK-Zeugnis Technischer Betriebswirt (10/2010),
// Teilnahmebescheinigung Datenschutzbeauftragter (01/2013), Lebenslauf (2003), Profil „about-me.md“ (2026).
// Bewusst nicht: vollständiges Geburtsdatum, Namen von Kolleg:innen, interne Projektnamen und Termine.

export const titel: Text = { de: 'Solutions Analyst', en: 'Solutions Analyst' };

export const profil: Text = {
  de: 'Seit 1988 bei der Ahlbrandt System GmbH in Lauterbach, heute Teil von BW Converting (Barry-Wehmiller). Vom Industrieelektroniker über Projektierung und Abteilungsleitung zur Betreuung von EDV und ERP-System; heute Solutions Analyst im Business Transformation Team mit den Schwerpunkten ERP und PLM. Industriemeister Elektro und Geprüfter Technischer Betriebswirt (IHK).',
  en: 'With Ahlbrandt System GmbH in Lauterbach since 1988, today part of BW Converting (Barry-Wehmiller). From industrial electronics technician via project engineering and department management to looking after IT and the ERP system; today Solutions Analyst in the Business Transformation Team, focusing on ERP and PLM. Master craftsman in electrical engineering (Industriemeister Elektro) and certified technical business administrator (IHK).',
};

export const firma: Text = {
  de: 'Ahlbrandt System GmbH, Lauterbach – heute BW Converting, ein Unternehmen von Barry-Wehmiller',
  en: 'Ahlbrandt System GmbH, Lauterbach – today BW Converting, a Barry-Wehmiller company',
};

export const stationen: { zeit: Text; rolle: Text; punkte?: { de: string[]; en: string[] } }[] = [
  {
    zeit: { de: 'heute', en: 'today' },
    rolle: { de: 'Solutions Analyst, Business Transformation Team', en: 'Solutions Analyst, Business Transformation Team' },
    punkte: {
      de: [
        'Einführung von Microsoft Dynamics 365 Finance & Operations',
        'ERP-Administration (Infra)',
        'Verantwortung für Bluestar PLM, Anbindung der Konstruktionsdaten (Produkte, Stücklisten) und EPLAN',
        'Workflow-, Replikations- und Release-Prozesse',
      ],
      en: [
        'Implementation of Microsoft Dynamics 365 Finance & Operations',
        'ERP administration (Infra)',
        'Responsible for Bluestar PLM, integration of engineering data (products, bills of materials) and EPLAN',
        'Workflow, replication and release processes',
      ],
    },
  },
  {
    zeit: { de: '12/2008 – heute', en: '12/2008 – today' },
    rolle: { de: 'ERP-Systembetreuer', en: 'ERP system administrator' },
    punkte: {
      de: [
        'Hilfeforum für Probleme mit EDV- und ERP-System eingeführt (2009)',
        'Berichte mit Crystal Reports im ERP-System (seit 2009)',
        'Projekt „Einführung von Barcodescannern in der Materialwirtschaft“ mit ERP-Anbindung (2010)',
      ],
      en: [
        'Introduced a help forum for IT and ERP issues (2009)',
        'Reports with Crystal Reports in the ERP system (since 2009)',
        'Project “barcode scanners in materials management” with ERP integration (2010)',
      ],
    },
  },
  {
    zeit: { de: '02/2006 – heute', en: '02/2006 – today' },
    rolle: { de: 'Interner Systemadministrator (EDV)', en: 'In-house IT system administrator' },
  },
  {
    zeit: { de: '08/2005 – 12/2006', en: '08/2005 – 12/2006' },
    rolle: { de: 'Abteilungsleiter Elektroabteilung (TB)', en: 'Head of the electrical department (TB)' },
    punkte: {
      de: ['Einführung der Dokumentationssoftware DokuPro (modularer Aufbau)'],
      en: ['Introduction of the documentation software DokuPro (modular structure)'],
    },
  },
  {
    zeit: { de: '02/1999 – 07/2005', en: '02/1999 – 07/2005' },
    rolle: { de: 'Projektierung', en: 'Project engineering' },
    punkte: {
      de: [
        'Projektierung elektronischer Maschinensteuerungen mit Schaltplänen in WSCAD (ab 2000)',
        'Stücklisten im ERP-System',
        'Leitung der Erstellung von Dokumentationen und Betriebsanleitungen (ab 2002)',
      ],
      en: [
        'Design of electronic machine controls with circuit diagrams in WSCAD (from 2000)',
        'Bills of materials in the ERP system',
        'Led the creation of documentation and operating manuals (from 2002)',
      ],
    },
  },
  {
    zeit: { de: '04/1993 – 01/1999', en: '04/1993 – 01/1999' },
    rolle: { de: 'Industrieelektroniker, Fertigung von Corona-Vorbehandlungsanlagen', en: 'Industrial electronics technician, production of corona treatment systems' },
    punkte: {
      de: ['Aufbau, Verkabelung und Test elektrischer Maschinensteuerungen', 'Elektrische Installation, mechanische Werkstatt', 'Montageeinsätze im In- und Ausland'],
      en: ['Building, wiring and testing electrical machine controls', 'Electrical installation, mechanical workshop', 'Installation assignments in Germany and abroad'],
    },
  },
  {
    zeit: { de: '04/1992 – 03/1993', en: '04/1992 – 03/1993' },
    rolle: { de: 'Grundwehrdienst', en: 'Military service' },
  },
  {
    zeit: { de: '08/1988 – 01/1992', en: '08/1988 – 01/1992' },
    rolle: { de: 'Ausbildung zum Industrieelektroniker, Fachrichtung Gerätetechnik (Abschluss IHK Gießen)', en: 'Apprenticeship as industrial electronics technician, device engineering (IHK Gießen)' },
  },
];

export const weiterbildung: { zeit: string; text: Text }[] = [
  { zeit: '2013', text: { de: 'Fachseminar Datenschutzbeauftragter (BDSG)', en: 'Seminar: data protection officer (German Federal Data Protection Act)' } },
  {
    zeit: '2010',
    text: {
      de: 'Geprüfter Technischer Betriebswirt (IHK Fulda), berufsbegleitend; Projektarbeit: Barcodescanner für Materialbuchungen im Lager',
      en: 'Certified technical business administrator (IHK Fulda), part-time; project: barcode scanners for warehouse bookings',
    },
  },
  { zeit: '2005', text: { de: 'Industriemeister Elektro', en: 'Master craftsman in electrical engineering (Industriemeister Elektro)' } },
  { zeit: '', text: { de: 'Seminare zu speicherprogrammierbaren Steuerungen (SIMATIC)', en: 'Seminars on programmable logic controllers (SIMATIC)' } },
];

export const schule: { zeit: string; text: Text }[] = [
  { zeit: '1984 – 1988', text: { de: 'Realschule, Eichbergschule Lauterbach – Mittlere Reife', en: 'Secondary school (Realschule), Eichbergschule Lauterbach – intermediate school certificate' } },
  { zeit: '1980 – 1984', text: { de: 'Mittelpunktschule Wartenberg', en: 'Mittelpunktschule Wartenberg' } },
  { zeit: '1978 – 1980', text: { de: 'Grundschule Stockhausen', en: 'Primary school Stockhausen' } },
];

export const kenntnisse: { bereich: Text; text: Text }[] = [
  { bereich: { de: 'ERP', en: 'ERP' }, text: { de: 'Microsoft Dynamics 365 Finance & Operations, Infra, Crystal Reports', en: 'Microsoft Dynamics 365 Finance & Operations, Infra, Crystal Reports' } },
  { bereich: { de: 'PLM / CAD', en: 'PLM / CAD' }, text: { de: 'Bluestar PLM, EPLAN, WSCAD, SolidWorks (CAD-Administration)', en: 'Bluestar PLM, EPLAN, WSCAD, SolidWorks (CAD administration)' } },
  { bereich: { de: 'Elektrotechnik', en: 'Electrical engineering' }, text: { de: 'Maschinensteuerungen, speicherprogrammierbare Steuerungen', en: 'Machine controls, programmable logic controllers' } },
  { bereich: { de: 'Weitere', en: 'Other' }, text: { de: 'Systemadministration, Datenschutz, Dokumentation', en: 'System administration, data protection, documentation' } },
];

export const persoenlich: Text = { de: 'Jahrgang 1972, geboren in Fulda, wohnhaft in Herbstein-Stockhausen', en: 'Born 1972 in Fulda, lives in Herbstein-Stockhausen' };
