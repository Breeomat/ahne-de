import type { Text } from './sprache';

// Visitenkarte mit Lebenslauf (versteckte Seite /visitenkarte/ bzw. /en/business-card/, 5× auf „Marc“ tippen).
// Quellen: Zwischenzeugnis Ahlbrandt (11/2011), IHK-Zeugnis Technischer Betriebswirt (10/2010),
// Teilnahmebescheinigung Datenschutzbeauftragter (01/2013), Lebenslauf (2003), Profil „about-me.md“ (2026).
// Ergänzt nach Angaben von Marc (10/2026): Rolle seit 2024, IT/ERP 2020–2024, Integration Infra → SAP,
// seit 2020 Vorgesetzter in den USA und rund die Hälfte der Meetings auf Englisch (für die Bewerbung umformuliert).
// Geburtsdatum (26.04.1972) und Anschrift auf Wunsch von Marc (11/2026).
// Bewusst nicht: Namen von Kolleg:innen, interne Projektnamen und Termine.

export const titel: Text = { de: 'Solutions Analyst · Business Platform IT', en: 'Solutions Analyst · Business Platform IT' };

export const profil: Text = {
  de: 'Seit 1988 bei der Ahlbrandt System GmbH in Lauterbach, heute Teil von BW Converting (Barry-Wehmiller). Vom Industrieelektroniker über Projektierung und Abteilungsleitung zur Betreuung von EDV und ERP-System; heute Solutions Analyst in der Business Platform IT mit Schwerpunkt Engineering und Quality. Industriemeister Elektro und Geprüfter Technischer Betriebswirt (IHK). Seit 2020 Teil eines global verteilten Teams; sicherer Umgang mit Englisch in Meetings, Präsentationen und Schriftverkehr.',
  en: 'With Ahlbrandt System GmbH in Lauterbach since 1988, today part of BW Converting (Barry-Wehmiller). From industrial electronics technician via project engineering and department management to looking after IT and the ERP system; today Solutions Analyst in Business Platform IT, focusing on engineering and quality. Master craftsman in electrical engineering (Industriemeister Elektro) and certified technical business administrator (IHK). Since 2020 part of a globally distributed team; confident use of English in meetings, presentations and written correspondence.',
};

export const firma: Text = {
  de: 'Ahlbrandt System GmbH, Lauterbach – heute BW Converting, ein Unternehmen von Barry-Wehmiller',
  en: 'Ahlbrandt System GmbH, Lauterbach – today BW Converting, a Barry-Wehmiller company',
};

export const stationen: { zeit: Text; rolle: Text; punkte?: { de: string[]; en: string[] } }[] = [
  {
    // laut Marc seit 05/2024
    zeit: { de: '05/2024 – heute', en: '05/2024 – today' },
    rolle: { de: 'Solutions Analyst, Business Platform IT – Schwerpunkt Engineering und Quality', en: 'Solutions Analyst, Business Platform IT – focus on engineering and quality' },
    punkte: {
      de: [
        'Aktuell: Integration des ERP-Systems Infra (Standort Lauterbach) in das SAP-System des Standorts Neuwied – danach Zusammenführung zu einem Unternehmen, BW Converting',
        'Parallel dazu: Neueinführung von Microsoft Dynamics 365 Finance & Operations in Green Bay (USA), danach in Lucca (Italien); anschließend Einführung weiterer Unternehmensteile in Finance & Operations – künftiger Schwerpunkt des Teams',
        'IT- und ERP-Betreuung für den Standort Lauterbach mit rund 110 Mitarbeitenden (zeitweise drei Standorte mit insgesamt rund 150 Mitarbeitenden)',
        'ERP-Administration (Infra)',
        'Abschaltung des ERP-Altsystems BAAN',
        'Bluestar PLM: Anbindung der Konstruktionsdaten (Produkte, Stücklisten) und EPLAN',
        'Qualitätsprozesse im ERP (CAPA, Nonconformances)',
        'Einbindung weiterer Firmen in die Ahlbrandt System GmbH (seit 2020, fortgeführt)',
        'Upgrade und Server-Update des ERP-Systems iScala in China, gemeinsam mit einem Team aus China und Indien',
        'Data Cleansing, Validierung der Datenmigration, Solution Validation, User Acceptance Testing',
      ],
      en: [
        'Currently: integrating the Infra ERP system (Lauterbach site) into the SAP system of the Neuwied site – followed by the merger into one company, BW Converting',
        'In parallel: new implementation of Microsoft Dynamics 365 Finance & Operations in Green Bay (USA), then in Lucca (Italy); afterwards rollout to further parts of the company – the team’s future focus',
        'IT and ERP support for the Lauterbach site with around 110 employees (at times three sites with around 150 employees in total)',
        'ERP administration (Infra)',
        'Decommissioning of the legacy BAAN ERP system',
        'Bluestar PLM: integration of engineering data (products, bills of materials) and EPLAN',
        'Quality processes in the ERP system (CAPA, nonconformances)',
        'Integration of further companies into Ahlbrandt System GmbH (ongoing since 2020)',
        'Upgrade and server update of the iScala ERP system in China, together with a team from China and India',
        'Data cleansing, data migration validation, solution validation, user acceptance testing',
      ],
    },
  },
  {
    // 02–12/2006 parallel zur Abteilungsleitung (laut Marc, 11/2026)
    zeit: { de: '02/2006 – 04/2024', en: '02/2006 – 04/2024' },
    rolle: { de: 'IT-Administrator und ERP-Systembetreuer', en: 'IT administrator and ERP system administrator' },
    punkte: {
      de: [
        'Interne Systemadministration (EDV) ab 2006, Betreuung des ERP-Systems ab 12/2008',
        'Ab 2020: Einbindung verschiedener Firmen in die Ahlbrandt System GmbH, u. a. aus Deutschland, England und den Niederlanden',
        'Hilfeforum für Probleme mit EDV- und ERP-System eingeführt (2009)',
        'Berichte mit Crystal Reports im ERP-System (ab 2009)',
        'Projekt „Einführung von Barcodescannern in der Materialwirtschaft“ mit ERP-Anbindung (2010)',
      ],
      en: [
        'In-house IT system administration from 2006, ERP system administration from 12/2008',
        'From 2020: integration of several companies into Ahlbrandt System GmbH, including from Germany, England and the Netherlands',
        'Introduced a help forum for IT and ERP issues (2009)',
        'Reports with Crystal Reports in the ERP system (from 2009)',
        'Project “barcode scanners in materials management” with ERP integration (2010)',
      ],
    },
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
  { zeit: '1996 – 1998', text: { de: 'Seminare zu speicherprogrammierbaren Steuerungen (SIMATIC)', en: 'Seminars on programmable logic controllers (SIMATIC)' } },
];

export const schule: { zeit: string; text: Text }[] = [
  { zeit: '1984 – 1988', text: { de: 'Realschule, Schule an der Wascherde, Lauterbach – Mittlere Reife', en: 'Secondary school (Realschule), Schule an der Wascherde, Lauterbach – intermediate school certificate' } },
  { zeit: '1980 – 1984', text: { de: 'Mittelpunktschule Wartenberg', en: 'Mittelpunktschule Wartenberg' } },
  { zeit: '1978 – 1980', text: { de: 'Grundschule Stockhausen', en: 'Primary school Stockhausen' } },
];

// Einstufungen aus Marcs Kompetenzbewertung (11/2026): Advanced = sehr gut, Intermediate = gut.
export const kenntnisse: { bereich: Text; text: Text }[] = [
  { bereich: { de: 'ERP', en: 'ERP' }, text: { de: 'Infra (umfassende Kenntnisse inkl. Administration), Microsoft Dynamics 365 Finance & Operations (Grundkenntnisse); ERP-Infrastruktur, -Integration und -Migration', en: 'Infra (in-depth knowledge incl. administration), Microsoft Dynamics 365 Finance & Operations (basic knowledge); ERP infrastructure, integration and migration' } },
  { bereich: { de: 'IT-Infrastruktur', en: 'IT infrastructure' }, text: { de: 'Windows-Client-Administration, Active Directory und Microsoft Entra ID (gut), Benutzerverwaltung, KACE Systems Management (gut), Fernwartung, Migration und Upgrade von Systemen, Abschaltung von Altsystemen', en: 'Windows client administration, Active Directory and Microsoft Entra ID (intermediate), user management, KACE Systems Management (intermediate), remote support, system migrations and upgrades, legacy system decommissioning' } },
  { bereich: { de: 'Daten und Berichte', en: 'Data and reporting' }, text: { de: 'Crystal Reports (sehr gut), Excel (sehr gut), SQL (gut), Microsoft Access (gut), Datenmigration und -validierung, Datenanalyse', en: 'Crystal Reports (advanced), Excel (advanced), SQL (intermediate), Microsoft Access (intermediate), data migration and validation, data analysis' } },
  { bereich: { de: 'Projektarbeit', en: 'Project work' }, text: { de: 'Koordination internationaler IT-Projekte, Anforderungsmanagement mit Azure DevOps (gut), Workshops, Solution Validation und User Acceptance Testing', en: 'Coordination of international IT projects, requirements management with Azure DevOps (intermediate), workshops, solution validation and user acceptance testing' } },
  // laut Marc: nur aus Projektsicht, keine Anwenderkenntnisse
  { bereich: { de: 'Projekterfahrung', en: 'Project experience' }, text: { de: 'SAP, iScala, Bluestar PLM – Erfahrung aus der Projektleitung (Integration, Upgrade, Anbindung), nicht als Anwender', en: 'SAP, iScala, Bluestar PLM – experience from project management (integration, upgrade, interfaces), not as an end user' } },
  { bereich: { de: 'Microsoft 365 und KI', en: 'Microsoft 365 and AI' }, text: { de: 'Teams, Outlook, Word, PowerPoint, SharePoint, OneDrive; Microsoft Copilot und KI-gestützte Auswertungen', en: 'Teams, Outlook, Word, PowerPoint, SharePoint, OneDrive; Microsoft Copilot and AI-assisted analysis' } },
  { bereich: { de: 'PLM / CAD', en: 'PLM / CAD' }, text: { de: 'EPLAN, WSCAD (sehr gut), SolidWorks (CAD-Administration), Konstruktionsdaten und Stücklisten', en: 'EPLAN, WSCAD (advanced), SolidWorks (CAD administration), engineering data and bills of materials' } },
  { bereich: { de: 'Elektrotechnik', en: 'Electrical engineering' }, text: { de: 'Maschinensteuerungen, speicherprogrammierbare Steuerungen', en: 'Machine controls, programmable logic controllers' } },
  { bereich: { de: 'Sprachen', en: 'Languages' }, text: { de: 'Deutsch (Muttersprache), Englisch C1, fließend (Business English), tägliche Arbeitssprache im internationalen Umfeld', en: 'German (native), English C1, fluent (business English), everyday working language in an international environment' } },
  { bereich: { de: 'Führerschein', en: 'Driving licence' }, text: { de: 'Klassen AM, A1, A, B, BE, C1, C1E, L', en: 'Categories AM, A1, A, B, BE, C1, C1E, L' } },
  { bereich: { de: 'Weitere', en: 'Other' }, text: { de: 'Datenschutz, Dokumentation', en: 'Data protection, documentation' } },
];

export const persoenlich: Text = { de: 'Geboren am 26.04.1972 in Fulda, wohnhaft in Herbstein-Stockhausen', en: 'Born 26 April 1972 in Fulda, lives in Herbstein-Stockhausen' };
