import { University } from '@shared/types';

/**
 * Comprehensive list of Italian universities (statali, private, telematiche).
 *
 * emailDomains are derived from each university's CINECA/Esse3 slug where
 * available, since in most cases the institutional email domain matches it
 * (e.g. unimol.esse3.cineca.it → @studenti.unimol.it / @unimol.it).
 * This is a reasonable default, NOT a verified guarantee for every entry,
 * universities marked with an empty emailDomains array had no slug source
 * available and need manual verification before being usable for login
 * validation.
 */
export const UNIVERSITIES: University[] = [
  // Public Universities
  {
    id: 'casd',
    name: 'Centro Alti Studi per la Difesa',
    shortName: 'CASD',
    emailDomains: ['casd.difesa.it'],
    city: 'Roma',
    type: 'statale',
    campuses: [
      {
        id: 'casd-roma',
        name: 'Palazzo Salviati',
        city: 'Roma',
        address: 'Piazza della Rovere 83, 00153 Roma',
      },
    ],
  },
  {
    id: 'iusspavia',
    name: 'Istituto Universitario di Studi Superiori di Pavia',
    shortName: 'IUSS Pavia',
    emailDomains: ['iusspavia.it'],
    city: 'Pavia',
    type: 'statale',
    campuses: [
      {
        id: 'iusspavia-broletto',
        name: 'Palazzo del Broletto',
        city: 'Pavia',
        address: 'Piazza della Vittoria 15, 27100 Pavia',
      },
    ],
  },
  {
    id: 'poliba',
    name: 'Politecnico di Bari',
    shortName: 'Poliba',
    emailDomains: ['poliba.it'],
    city: 'Bari',
    type: 'statale',
    campuses: [
      {
        id: 'poliba-bari',
        name: 'Campus di Bari',
        city: 'Bari',
        address: 'Via Orabona 4, 70125 Bari',
      },
      {
        id: 'poliba-taranto',
        name: 'Centro Interdipartimentale Magna Grecia - Taranto',
        city: 'Taranto',
        address: 'Viale del Turismo 10, 74123 Taranto',
      },
      {
        id: 'poliba-foggia',
        name: 'Polo didattico di Foggia',
        city: 'Foggia',
        address: 'Piazzale Puglia 10, 71121 Foggia',
      },
    ],
  },
  {
    id: 'polimi',
    name: 'Politecnico di Milano',
    shortName: 'PoliMi',
    emailDomains: ['polimi.it'],
    city: 'Milano',
    type: 'statale',
    campuses: [
      {
        id: 'polimi-leonardo',
        name: 'Campus Leonardo',
        city: 'Milano',
        address: 'Piazza Leonardo da Vinci 32, 20133 Milano',
      },
      {
        id: 'polimi-bovisa',
        name: 'Campus Bovisa',
        city: 'Milano',
        address: 'Via Giuseppe La Masa 1, 20156 Milano',
      },
      { id: 'polimi-cremona', name: 'Polo territoriale di Cremona', city: 'Cremona' },
      {
        id: 'polimi-lecco',
        name: 'Polo territoriale di Lecco',
        city: 'Lecco',
        address: 'Via Gaetano Previati 1/c, 23900 Lecco',
      },
      {
        id: 'polimi-mantova',
        name: 'Polo territoriale di Mantova',
        city: 'Mantova',
        address: "Piazza d'Arco 3, 46100 Mantova",
      },
      { id: 'polimi-piacenza', name: 'Polo territoriale di Piacenza', city: 'Piacenza' },
    ],
  },
  {
    id: 'polito',
    name: 'Politecnico di Torino',
    shortName: 'PoliTo',
    emailDomains: ['polito.it'],
    city: 'Torino',
    type: 'statale',
    campuses: [
      {
        id: 'polito-cittadella',
        name: 'Cittadella Politecnica',
        city: 'Torino',
        address: 'Corso Duca degli Abruzzi 24, 10129 Torino',
      },
      {
        id: 'polito-valentino',
        name: 'Castello del Valentino',
        city: 'Torino',
        address: 'Viale Pier Andrea Mattioli 39, 10125 Torino',
      },
      {
        id: 'polito-lingotto',
        name: 'Sede Lingotto',
        city: 'Torino',
        address: 'Via Nizza 230, 10126 Torino',
      },
    ],
  },
  {
    id: 'imtlucca',
    name: 'Scuola IMT Alti Studi di Lucca',
    shortName: 'IMT Lucca',
    emailDomains: ['imtlucca.it'],
    city: 'Lucca',
    type: 'statale',
    campuses: [
      {
        id: 'imtlucca-boccherini',
        name: 'Sede di Piazza San Ponziano (ex Boccherini)',
        city: 'Lucca',
        address: 'Piazza San Ponziano 6, 55100 Lucca',
      },
    ],
  },
  {
    id: 'sissa',
    name: 'Scuola Internazionale Superiore di Studi Avanzati di Trieste',
    shortName: 'SISSA',
    emailDomains: ['sissa.it'],
    city: 'Trieste',
    type: 'statale',
    campuses: [
      {
        id: 'sissa-trieste',
        name: 'Sede di Trieste - Via Bonomea',
        city: 'Trieste',
        address: 'Via Bonomea 265, 34136 Trieste',
      },
    ],
  },
  {
    id: 'sns',
    name: 'Scuola Normale Superiore di Pisa',
    shortName: 'Normale Pisa',
    emailDomains: ['sns.it'],
    city: 'Pisa',
    type: 'statale',
    campuses: [
      {
        id: 'sns-pisa',
        name: 'Palazzo della Carovana - Pisa',
        city: 'Pisa',
        address: 'Piazza dei Cavalieri 7, 56126 Pisa',
      },
      { id: 'sns-cortona', name: 'Sede di Cortona', city: 'Cortona' },
      { id: 'sns-firenze', name: 'Sede di Firenze - Palazzo Vegni', city: 'Firenze' },
    ],
  },
  {
    id: 'ssm',
    name: 'Scuola Superiore Meridionale di Napoli',
    shortName: 'SSM Napoli',
    emailDomains: ['ssm.unina.it'],
    city: 'Napoli',
    type: 'statale',
    campuses: [
      { id: 'ssm-napoli', name: 'Complesso dei Santi Marcellino e Festo', city: 'Napoli' },
    ],
  },
  {
    id: 'sssup',
    name: "Scuola Superiore Sant'Anna di Pisa",
    shortName: "Sant'Anna Pisa",
    emailDomains: ['santannapisa.it'],
    city: 'Pisa',
    type: 'statale',
    campuses: [
      {
        id: 'sssup-pisa',
        name: 'Sede centrale - Piazza Martiri della Libertà',
        city: 'Pisa',
        address: 'Piazza Martiri della Libertà 33, 56127 Pisa',
      },
      {
        id: 'sssup-pontedera',
        name: 'Polo di Pontedera (Istituto di BioRobotica)',
        city: 'Pontedera',
        address: 'Via Piaggio 34, 56025 Pontedera',
      },
    ],
  },
  {
    id: 'unive',
    name: "Università Ca' Foscari Venezia",
    shortName: "Ca' Foscari",
    emailDomains: ['unive.it'],
    city: 'Venezia',
    type: 'statale',
    campuses: [],
  },
  {
    id: 'uniurb',
    name: 'Università degli Studi "Carlo Bo" di Urbino',
    shortName: 'UniUrb',
    emailDomains: ['uniurb.it'],
    city: 'Urbino',
    type: 'statale',
    campuses: [
      {
        id: 'uniurb-urbino',
        name: 'Sede di Urbino - Palazzo Bonaventura',
        city: 'Urbino',
        address: 'Via Aurelio Saffi 2, 61029 Urbino',
      },
      { id: 'uniurb-fano', name: 'Polo di Fano (Biotecnologie)', city: 'Fano' },
      { id: 'uniurb-pesaro', name: 'Polo di Pesaro', city: 'Pesaro' },
    ],
  },
  {
    id: 'univpm',
    name: 'Università Politecnica delle Marche',
    shortName: 'UnivPM',
    emailDomains: ['univpm.it', 'studenti.univpm.it'],
    city: 'Ancona',
    type: 'statale',
    campuses: [
      {
        id: 'univpm-centro',
        name: 'Sede centrale - Piazza Roma',
        city: 'Ancona',
        address: 'Piazza Roma 22, 60121 Ancona',
      },
      {
        id: 'univpm-montedago',
        name: 'Polo di Monte Dago (Ingegneria, Agraria, Scienze)',
        city: 'Ancona',
        address: 'Via Brecce Bianche, 60131 Ancona',
      },
      { id: 'univpm-torrette', name: 'Polo di Torrette (Medicina)', city: 'Ancona' },
      { id: 'univpm-pesaro', name: 'Sede di Pesaro', city: 'Pesaro' },
      { id: 'univpm-fermo', name: 'Sede di Fermo', city: 'Fermo' },
      { id: 'univpm-ascolipiceno', name: 'Sede di Ascoli Piceno', city: 'Ascoli Piceno' },
    ],
  },
  {
    id: 'uniba',
    name: 'Università degli Studi di Bari',
    shortName: 'UniBa',
    emailDomains: ['uniba.it'],
    city: 'Bari',
    type: 'statale',
    campuses: [
      {
        id: 'uniba-bari',
        name: 'Sede di Bari',
        city: 'Bari',
        address: 'Piazza Umberto I 1, 70121 Bari',
      },
      { id: 'uniba-taranto', name: 'Dipartimento Jonico - Taranto', city: 'Taranto' },
      { id: 'uniba-brindisi', name: 'Sede di Brindisi', city: 'Brindisi' },
    ],
  },
  {
    id: 'unibg',
    name: 'Università degli Studi di Bergamo',
    shortName: 'UniBg',
    emailDomains: ['unibg.it'],
    city: 'Bergamo',
    type: 'statale',
    campuses: [
      {
        id: 'unibg-umanistico',
        name: 'Campus Umanistico - Città Alta',
        city: 'Bergamo',
        address: 'Via Salvecchio 19, 24129 Bergamo',
      },
      {
        id: 'unibg-economico',
        name: 'Campus Economico-Giuridico - Città Bassa',
        city: 'Bergamo',
        address: 'Via dei Caniana 2, 24127 Bergamo',
      },
      {
        id: 'unibg-dalmine',
        name: 'Campus di Ingegneria - Dalmine',
        city: 'Dalmine',
        address: 'Viale Guglielmo Marconi 5, 24044 Dalmine',
      },
    ],
  },
  {
    id: 'unibo',
    name: 'Università degli Studi di Bologna',
    shortName: 'UniBo',
    emailDomains: ['unibo.it', 'studio.unibo.it', 'esterni.unibo.it'],
    city: 'Bologna',
    type: 'statale',
    campuses: [
      {
        id: 'unibo-bologna',
        name: 'Sede di Bologna',
        city: 'Bologna',
        address: 'Via Zamboni 33, 40126 Bologna',
      },
      {
        id: 'unibo-cesena',
        name: 'Campus di Cesena',
        city: 'Cesena',
        address: "Via dell'Università, 47521 Cesena",
      },
      {
        id: 'unibo-forli',
        name: 'Campus di Forlì',
        city: 'Forlì',
        address: 'Corso della Repubblica, 47121 Forlì',
      },
      {
        id: 'unibo-ravenna',
        name: 'Campus di Ravenna',
        city: 'Ravenna',
        address: 'Via Baccarini 27, 48121 Ravenna',
      },
      { id: 'unibo-rimini', name: 'Campus di Rimini', city: 'Rimini' },
    ],
  },
  {
    id: 'unibs',
    name: 'Università degli Studi di Brescia',
    shortName: 'UniBs',
    emailDomains: ['unibs.it'],
    city: 'Brescia',
    type: 'statale',
    campuses: [
      {
        id: 'unibs-centro',
        name: 'Sede centrale - Piazza del Mercato',
        city: 'Brescia',
        address: 'Piazza del Mercato 15, 25121 Brescia',
      },
      {
        id: 'unibs-sanfaustino',
        name: 'San Faustino (Economia, Giurisprudenza)',
        city: 'Brescia',
        address: 'Via San Faustino 74/B, 25122 Brescia',
      },
      {
        id: 'unibs-nord',
        name: 'Campus Nord (Medicina, Ingegneria)',
        city: 'Brescia',
        address: 'Viale Europa 11, 25123 Brescia',
      },
    ],
  },
  {
    id: 'unica',
    name: 'Università degli Studi di Cagliari',
    shortName: 'UniCa',
    emailDomains: ['unica.it'],
    city: 'Cagliari',
    type: 'statale',
    campuses: [
      {
        id: 'unica-saduchessa',
        name: 'Campus Sa Duchessa',
        city: 'Cagliari',
        address: 'Via Is Mirrionis 1, 09123 Cagliari',
      },
      {
        id: 'unica-monserrato',
        name: 'Cittadella Universitaria di Monserrato',
        city: 'Monserrato',
        address: 'S.S. 554 Bivio Sestu, 09042 Monserrato',
      },
      {
        id: 'unica-santignazio',
        name: "Campus Sant'Ignazio (Economia, Giurisprudenza, Scienze Politiche)",
        city: 'Cagliari',
        address: "Viale Sant'Ignazio 76, 09123 Cagliari",
      },
    ],
  },
  {
    id: 'unicam',
    name: 'Università degli Studi di Camerino',
    shortName: 'UniCam',
    emailDomains: ['unicam.it'],
    city: 'Camerino',
    type: 'statale',
    campuses: [
      {
        id: 'unicam-camerino',
        name: 'Sede di Camerino',
        city: 'Camerino',
        address: 'Piazza Cavour 19/F, 62032 Camerino',
      },
      {
        id: 'unicam-ascolipiceno',
        name: 'Scuola di Architettura e Design - Ascoli Piceno',
        city: 'Ascoli Piceno',
        address: 'Viale della Rimembranza 9, 63100 Ascoli Piceno',
      },
      {
        id: 'unicam-matelica',
        name: 'Sezione di Medicina Veterinaria - Matelica',
        city: 'Matelica',
        address: 'Via Circonvallazione 93/95, 62024 Matelica',
      },
      {
        id: 'unicam-sanbenedetto',
        name: 'Sede di San Benedetto del Tronto',
        city: 'San Benedetto del Tronto',
      },
    ],
  },
  {
    id: 'unicas',
    name: 'Università degli Studi di Cassino e del Lazio Meridionale',
    shortName: 'UniCas',
    emailDomains: ['unicas.it'],
    city: 'Cassino',
    type: 'statale',
    campuses: [
      {
        id: 'unicas-folcara',
        name: 'Campus Folcara',
        city: 'Cassino',
        address: "Viale dell'Università, 03043 Cassino",
      },
      {
        id: 'unicas-terracina',
        name: 'Sede di Terracina',
        city: 'Terracina',
        address: 'Viale Circe 46, 04019 Terracina',
      },
      { id: 'unicas-frosinone', name: 'Sede di Frosinone', city: 'Frosinone' },
    ],
  },
  {
    id: 'unict',
    name: 'Università degli Studi di Catania',
    shortName: 'UniCt',
    emailDomains: ['unict.it'],
    city: 'Catania',
    type: 'statale',
    campuses: [
      {
        id: 'unict-catania',
        name: 'Cittadella Universitaria - Catania',
        city: 'Catania',
        address: "Piazza dell'Università 2, 95131 Catania",
      },
      {
        id: 'unict-siracusa',
        name: 'Struttura Didattica Speciale di Architettura - Siracusa',
        city: 'Siracusa',
      },
      { id: 'unict-ragusa', name: 'Polo di Ragusa', city: 'Ragusa' },
    ],
  },
  {
    id: 'unicz',
    name: 'Università degli Studi di Catanzaro - Magna Graecia',
    shortName: 'UniCz',
    emailDomains: ['unicz.it'],
    city: 'Catanzaro',
    type: 'statale',
    campuses: [
      {
        id: 'unicz-germaneto',
        name: 'Campus Salvatore Venuta - Germaneto',
        city: 'Catanzaro',
        address: 'Viale Europa, 88100 Catanzaro',
      },
      { id: 'unicz-roccelletta', name: 'Polo di Farmacia - Roccelletta di Borgia', city: 'Borgia' },
    ],
  },
  {
    id: 'unife',
    name: 'Università degli Studi di Ferrara',
    shortName: 'UniFe',
    emailDomains: ['unife.it', 'edu.unife.it'],
    city: 'Ferrara',
    type: 'statale',
    campuses: [
      {
        id: 'unife-centro',
        name: 'Sede centrale - Via Savonarola',
        city: 'Ferrara',
        address: 'Via Savonarola 9, 44121 Ferrara',
      },
      {
        id: 'unife-saragat',
        name: 'Polo Scientifico-Tecnologico - Via Saragat',
        city: 'Ferrara',
        address: 'Via Saragat 1, 44122 Ferrara',
      },
    ],
  },
  {
    id: 'unifi',
    name: 'Università degli Studi di Firenze',
    shortName: 'UniFi',
    emailDomains: ['unifi.it', 'stud.unifi.it'],
    city: 'Firenze',
    type: 'statale',
    campuses: [
      {
        id: 'unifi-sanmarco',
        name: 'Sede centrale - Piazza San Marco',
        city: 'Firenze',
        address: 'Piazza San Marco 4, 50121 Firenze',
      },
      {
        id: 'unifi-novoli',
        name: 'Campus di Novoli (Economia, Giurisprudenza, Scienze Politiche)',
        city: 'Firenze',
        address: 'Via delle Pandette 32, 50127 Firenze',
      },
      { id: 'unifi-prato', name: 'Polo Universitario di Prato', city: 'Prato' },
      {
        id: 'unifi-sesto',
        name: 'Polo Scientifico di Sesto Fiorentino',
        city: 'Sesto Fiorentino',
        address: 'Viale delle Idee 26, 50019 Sesto Fiorentino',
      },
    ],
  },
  {
    id: 'unifg',
    name: 'Università degli Studi di Foggia',
    shortName: 'UniFg',
    emailDomains: ['unifg.it'],
    city: 'Foggia',
    type: 'statale',
    campuses: [
      {
        id: 'unifg-centro',
        name: 'Sede centrale - Palazzo Ateneo',
        city: 'Foggia',
        address: 'Via Antonio Gramsci 89/91, 71121 Foggia',
      },
      {
        id: 'unifg-umanistico',
        name: 'Polo Umanistico - Via Arpi',
        city: 'Foggia',
        address: 'Via Arpi 155, 71121 Foggia',
      },
      {
        id: 'unifg-scientifico',
        name: 'Polo Scientifico - Via Napoli',
        city: 'Foggia',
        address: 'Via Napoli 25, 71122 Foggia',
      },
    ],
  },
  {
    id: 'unige',
    name: 'Università degli Studi di Genova',
    shortName: 'UniGe',
    emailDomains: ['unige.it'],
    city: 'Genova',
    type: 'statale',
    campuses: [
      {
        id: 'unige-genova',
        name: 'Sede di Genova',
        city: 'Genova',
        address: 'Via Balbi 5, 16126 Genova',
      },
      { id: 'unige-savona', name: 'Campus di Savona', city: 'Savona' },
      { id: 'unige-imperia', name: 'Campus di Imperia', city: 'Imperia' },
      { id: 'unige-laspezia', name: 'Campus di La Spezia', city: 'La Spezia' },
    ],
  },
  {
    id: 'univaq',
    name: "Università degli Studi dell'Aquila",
    shortName: 'UnivAQ',
    emailDomains: ['univaq.it', 'student.univaq.it'],
    city: "L'Aquila",
    type: 'statale',
    campuses: [
      {
        id: 'univaq-centro',
        name: 'Rettorato - Palazzo Camponeschi',
        city: "L'Aquila",
        address: "Piazza Santa Margherita 2, 67100 L'Aquila",
      },
      {
        id: 'univaq-coppito',
        name: 'Polo di Coppito (Scienze, Ingegneria, Medicina)',
        city: "L'Aquila",
        address: "Via Vetoio, 67100 Coppito, L'Aquila",
      },
    ],
  },
  {
    id: 'unimc',
    name: 'Università degli Studi di Macerata',
    shortName: 'UniMc',
    emailDomains: ['unimc.it'],
    city: 'Macerata',
    type: 'statale',
    campuses: [
      {
        id: 'unimc-centro',
        name: 'Campus nel centro storico di Macerata',
        city: 'Macerata',
        address: 'Piaggia della Torre 8, 62100 Macerata',
      },
    ],
  },
  {
    id: 'unime',
    name: 'Università degli Studi di Messina',
    shortName: 'UniMe',
    emailDomains: ['unime.it'],
    city: 'Messina',
    type: 'statale',
    campuses: [
      {
        id: 'unime-papardo',
        name: 'Polo Papardo (Scienze, Ingegneria)',
        city: 'Messina',
        address: "Viale Ferdinando Stagno d'Alcontres 31, 98166 Messina",
      },
      {
        id: 'unime-annunziata',
        name: 'Polo Annunziata (Farmacia, Veterinaria)',
        city: 'Messina',
        address: 'Viale Giovanni Palatucci, 98168 Messina',
      },
      {
        id: 'unime-centro',
        name: 'Sede centrale - Piazza Pugliatti',
        city: 'Messina',
        address: 'Piazza Salvatore Pugliatti 1, 98122 Messina',
      },
    ],
  },
  {
    id: 'unimi',
    name: 'Università degli Studi di Milano',
    shortName: 'UniMi',
    emailDomains: ['unimi.it', 'studenti.unimi.it'],
    city: 'Milano',
    type: 'statale',
    campuses: [
      {
        id: 'unimi-cagranda',
        name: "Sede centrale - Ca' Granda",
        city: 'Milano',
        address: 'Via Festa del Perdono 7, 20122 Milano',
      },
      {
        id: 'unimi-cittastudi',
        name: 'Città Studi',
        city: 'Milano',
        address: 'Via Celoria 2, 20133 Milano',
      },
      {
        id: 'unimi-lodi',
        name: 'Polo di Lodi (Medicina Veterinaria)',
        city: 'Lodi',
        address: "Via dell'Università 6, 26900 Lodi",
      },
      { id: 'unimi-sesto', name: 'Polo di Sesto San Giovanni', city: 'Sesto San Giovanni' },
    ],
  },
  {
    id: 'unimib',
    name: 'Università degli Studi di Milano-Bicocca',
    shortName: 'UniMib',
    emailDomains: ['unimib.it', 'campus.unimib.it'],
    city: 'Milano',
    type: 'statale',
    campuses: [
      {
        id: 'unimib-bicocca',
        name: 'Campus di Milano - Quartiere Bicocca',
        city: 'Milano',
        address: "Piazza dell'Ateneo Nuovo 1, 20126 Milano",
      },
      { id: 'unimib-monza', name: 'Polo di Medicina e Chirurgia - Monza', city: 'Monza' },
    ],
  },
  {
    id: 'unimore',
    name: 'Università degli Studi di Modena e Reggio Emilia',
    shortName: 'UniMore',
    emailDomains: ['unimore.it'],
    city: 'Modena',
    type: 'statale',
    campuses: [
      {
        id: 'unimore-modena',
        name: 'Sede di Modena',
        city: 'Modena',
        address: 'Via Università 4, 41121 Modena',
      },
      {
        id: 'unimore-reggio',
        name: 'Sede di Reggio Emilia',
        city: 'Reggio Emilia',
        address: 'Viale Antonio Allegri 9, 42121 Reggio Emilia',
      },
    ],
  },
  {
    id: 'uniparthenope',
    name: 'Università degli Studi di Napoli Parthenope',
    shortName: 'Parthenope',
    emailDomains: ['uniparthenope.it'],
    city: 'Napoli',
    type: 'statale',
    campuses: [
      {
        id: 'uniparthenope-acton',
        name: 'Sede Centrale - Via Acton',
        city: 'Napoli',
        address: 'Via Ammiraglio Ferdinando Acton 38, 80133 Napoli',
      },
      {
        id: 'uniparthenope-pacanowski',
        name: 'Palazzo Pacanowski (Polo Giuridico-Economico)',
        city: 'Napoli',
        address: 'Via Generale Parisi 13, 80132 Napoli',
      },
      {
        id: 'uniparthenope-centrodirezionale',
        name: 'Centro Direzionale (Ingegneria, Scienze e Tecnologie)',
        city: 'Napoli',
      },
      { id: 'uniparthenope-nola', name: 'Sede di Nola', city: 'Nola' },
    ],
  },
  {
    id: 'unina',
    name: 'Università degli Studi di Napoli Federico II',
    shortName: 'Federico II',
    emailDomains: ['unina.it', 'studenti.unina.it'],
    city: 'Napoli',
    type: 'statale',
    // NOTE: l'ateneo conta oltre 60 sedi sparse a Napoli e provincia - qui sono elencati solo
    // i poli principali e più riconoscibili, non l'elenco esaustivo.
    campuses: [
      {
        id: 'unina-centro-storico',
        name: 'Centro Storico (sede centrale)',
        city: 'Napoli',
        address: 'Corso Umberto I 40, 80138 Napoli',
      },
      {
        id: 'unina-fuorigrotta',
        name: 'Polo di Ingegneria - Fuorigrotta',
        city: 'Napoli',
        address: 'Piazzale Vincenzo Tecchio 80, 80125 Napoli',
      },
      {
        id: 'unina-policlinico',
        name: 'Policlinico (Scuola di Medicina)',
        city: 'Napoli',
        address: 'Via Sergio Pansini 5, 80131 Napoli',
      },
      {
        id: 'unina-portici',
        name: 'Polo di Agraria - Portici',
        city: 'Portici',
        address: 'Via Università 100, 80055 Portici',
      },
      {
        id: 'unina-quartieri-spagnoli',
        name: 'Polo di Architettura - Quartieri Spagnoli',
        city: 'Napoli',
      },
    ],
  },
  {
    id: 'unipd',
    name: 'Università degli Studi di Padova',
    shortName: 'UniPd',
    emailDomains: ['unipd.it', 'studenti.unipd.it'],
    city: 'Padova',
    type: 'statale',
    campuses: [
      {
        id: 'unipd-padova',
        name: 'Sede di Padova',
        city: 'Padova',
        address: 'Via VIII Febbraio 2, 35122 Padova',
      },
      {
        id: 'unipd-rovigo',
        name: 'Sede di Rovigo',
        city: 'Rovigo',
        address: 'Viale Porta Adige 45, 45100 Rovigo',
      },
      { id: 'unipd-treviso', name: 'Sede di Treviso', city: 'Treviso' },
      { id: 'unipd-vicenza', name: 'Sede di Vicenza', city: 'Vicenza' },
      {
        id: 'unipd-legnaro',
        name: 'Polo di Agraria - Legnaro',
        city: 'Legnaro',
        address: "Via dell'Università 16, 35020 Legnaro",
      },
    ],
  },
  {
    id: 'unipa',
    name: 'Università degli Studi di Palermo',
    shortName: 'UniPa',
    emailDomains: ['unipa.it', 'community.unipa.it'],
    city: 'Palermo',
    type: 'statale',
    campuses: [
      {
        id: 'unipa-palermo',
        name: 'Cittadella Universitaria - Palermo',
        city: 'Palermo',
        address: 'Viale delle Scienze, 90128 Palermo',
      },
      {
        id: 'unipa-trapani',
        name: 'Polo Territoriale di Trapani',
        city: 'Trapani',
        address: 'Lungomare Dante Alighieri 2, 91016 Trapani',
      },
      {
        id: 'unipa-agrigento',
        name: 'Polo Territoriale di Agrigento',
        city: 'Agrigento',
        address: 'Via Ugo La Malfa 1, 92100 Agrigento',
      },
      {
        id: 'unipa-caltanissetta',
        name: 'Polo Territoriale di Caltanissetta',
        city: 'Caltanissetta',
      },
    ],
  },
  {
    id: 'unipr',
    name: 'Università degli Studi di Parma',
    shortName: 'UniPr',
    emailDomains: ['unipr.it'],
    city: 'Parma',
    type: 'statale',
    campuses: [
      {
        id: 'unipr-centro',
        name: 'Sede centrale - Via Università',
        city: 'Parma',
        address: 'Via Università 12, 43121 Parma',
      },
      {
        id: 'unipr-campus',
        name: 'Campus delle Scienze - Parco Area delle Scienze',
        city: 'Parma',
      },
    ],
  },
  {
    id: 'unipv',
    name: 'Università degli Studi di Pavia',
    shortName: 'UniPv',
    emailDomains: ['unipv.it', 'universitadipavia.it'],
    city: 'Pavia',
    type: 'statale',
    campuses: [
      {
        id: 'unipv-centro',
        name: 'Sede centrale - Corso Strada Nuova',
        city: 'Pavia',
        address: 'Corso Strada Nuova 65, 27100 Pavia',
      },
      {
        id: 'unipv-ferrata',
        name: 'Polo Scientifico - Viale Ferrata',
        city: 'Pavia',
        address: 'Viale Ambrogio Ferrata 1, 27100 Pavia',
      },
      { id: 'unipv-mantova', name: 'Sede di Mantova', city: 'Mantova' },
      { id: 'unipv-cremona', name: 'Sede di Cremona', city: 'Cremona' },
    ],
  },
  {
    id: 'unipg',
    name: 'Università degli Studi di Perugia',
    shortName: 'UniPg',
    emailDomains: ['unipg.it'],
    city: 'Perugia',
    type: 'statale',
    campuses: [
      {
        id: 'unipg-perugia',
        name: 'Sede di Perugia',
        city: 'Perugia',
        address: "Piazza dell'Università 1, 06121 Perugia",
      },
      {
        id: 'unipg-terni',
        name: 'Polo Scientifico Didattico di Terni',
        city: 'Terni',
        address: 'Strada di Pentima 4, 05100 Terni',
      },
    ],
  },
  {
    id: 'iusm',
    name: 'Università degli Studi di Roma "Foro Italico"',
    shortName: 'Foro Italico',
    emailDomains: ['uniroma4.it'],
    city: 'Roma',
    type: 'statale',
    campuses: [
      {
        id: 'iusm-foroitalico',
        name: 'Sede del Foro Italico',
        city: 'Roma',
        address: 'Piazza Lauro De Bosis 15, 00135 Roma',
      },
    ],
  },
  {
    id: 'uniroma1',
    name: 'Università degli Studi di Roma "La Sapienza"',
    shortName: 'Sapienza',
    emailDomains: ['uniroma1.it', 'studenti.uniroma1.it'],
    city: 'Roma',
    type: 'statale',
    campuses: [
      {
        id: 'uniroma1-citta-universitaria',
        name: 'Città Universitaria',
        city: 'Roma',
        address: 'Piazzale Aldo Moro 5, 00185 Roma',
      },
      { id: 'uniroma1-latina', name: 'Polo Universitario di Latina', city: 'Latina' },
      { id: 'uniroma1-rieti', name: 'Polo Universitario di Rieti', city: 'Rieti' },
    ],
  },
  {
    id: 'uniroma2',
    name: 'Università degli Studi di Roma "Tor Vergata"',
    shortName: 'Tor Vergata',
    emailDomains: ['uniroma2.it', 'students.uniroma2.eu'],
    city: 'Roma',
    type: 'statale',
    campuses: [
      {
        id: 'uniroma2-torvergata',
        name: 'Campus di Tor Vergata',
        city: 'Roma',
        address: 'Via Cracovia, 00133 Roma',
      },
    ],
  },
  {
    id: 'unisa',
    name: 'Università degli Studi di Salerno',
    shortName: 'UniSa',
    emailDomains: ['unisa.it', 'studenti.unisa.it'],
    city: 'Salerno',
    type: 'statale',
    campuses: [
      {
        id: 'unisa-fisciano',
        name: 'Campus di Fisciano (sede principale)',
        city: 'Fisciano',
        address: 'Via Giovanni Paolo II 132, 84084 Fisciano',
      },
      {
        id: 'unisa-baronissi',
        name: 'Campus di Baronissi (Medicina)',
        city: 'Baronissi',
        address: 'Via Salvador Allende, 84081 Baronissi',
      },
    ],
  },
  {
    id: 'uniss',
    name: 'Università degli Studi di Sassari',
    shortName: 'UniSs',
    emailDomains: ['uniss.it'],
    city: 'Sassari',
    type: 'statale',
    campuses: [
      {
        id: 'uniss-sassari',
        name: "Sede di Sassari - Palazzo dell'Università",
        city: 'Sassari',
        address: 'Piazza Università 21, 07100 Sassari',
      },
      { id: 'uniss-alghero', name: 'Sede di Alghero', city: 'Alghero' },
      { id: 'uniss-nuoro', name: 'Sede di Nuoro', city: 'Nuoro' },
      { id: 'uniss-olbia', name: 'Sede di Olbia', city: 'Olbia' },
      { id: 'uniss-oristano', name: 'Sede di Oristano', city: 'Oristano' },
    ],
  },
  {
    id: 'unite',
    name: 'Università degli Studi di Teramo',
    shortName: 'UniTe',
    emailDomains: ['unite.it'],
    city: 'Teramo',
    type: 'statale',
    campuses: [
      {
        id: 'unite-teramo',
        name: "Campus Coste Sant'Agostino",
        city: 'Teramo',
        address: 'Via Renato Balzarini 1, 64100 Teramo',
      },
      { id: 'unite-avezzano', name: 'Sede di Avezzano (Giurisprudenza)', city: 'Avezzano' },
    ],
  },
  {
    id: 'unito',
    name: 'Università degli Studi di Torino',
    shortName: 'UniTo',
    emailDomains: ['unito.it', 'edu.unito.it'],
    city: 'Torino',
    type: 'statale',
    campuses: [
      {
        id: 'unito-torino',
        name: 'Sede di Torino',
        city: 'Torino',
        address: 'Via Giuseppe Verdi 8, 10124 Torino',
      },
      {
        id: 'unito-grugliasco',
        name: 'Campus di Grugliasco (Agraria e Medicina Veterinaria)',
        city: 'Grugliasco',
        address: 'Largo Paolo Braccini 2, 10095 Grugliasco',
      },
      {
        id: 'unito-savigliano',
        name: 'Polo di Savigliano',
        city: 'Savigliano',
        address: 'Via Giuseppe Garibaldi 6, 12038 Savigliano',
      },
    ],
  },
  {
    id: 'unitn',
    name: 'Università degli Studi di Trento',
    shortName: 'UniTn',
    emailDomains: ['unitn.it', 'studenti.unitn.it'],
    city: 'Trento',
    type: 'statale',
    campuses: [
      {
        id: 'unitn-trento',
        name: 'Sede di Trento',
        city: 'Trento',
        address: 'Via Belenzani 12, 38122 Trento',
      },
      {
        id: 'unitn-povo',
        name: 'Polo di Povo (Ingegneria, Scienze)',
        city: 'Trento',
        address: 'Via Sommarive 9, 38123 Povo',
      },
      {
        id: 'unitn-rovereto',
        name: 'Polo di Rovereto (Scienze Cognitive)',
        city: 'Rovereto',
        address: 'Corso Bettini 84, 38068 Rovereto',
      },
    ],
  },
  {
    id: 'units',
    name: 'Università degli Studi di Trieste',
    shortName: 'UniTs',
    emailDomains: ['units.it'],
    city: 'Trieste',
    type: 'statale',
    campuses: [
      {
        id: 'units-trieste',
        name: 'Campus di Piazzale Europa',
        city: 'Trieste',
        address: 'Piazzale Europa 1, 34127 Trieste',
      },
      { id: 'units-gorizia', name: 'Sede di Gorizia', city: 'Gorizia' },
      { id: 'units-pordenone', name: 'Sede di Pordenone', city: 'Pordenone' },
      { id: 'units-portogruaro', name: 'Sede di Portogruaro', city: 'Portogruaro' },
    ],
  },
  {
    id: 'uniud',
    name: 'Università degli Studi di Udine',
    shortName: 'UniUd',
    emailDomains: ['uniud.it'],
    city: 'Udine',
    type: 'statale',
    campuses: [
      {
        id: 'uniud-udine',
        name: 'Sede di Udine - Palazzo Florio',
        city: 'Udine',
        address: 'Via Palladio 8, 33100 Udine',
      },
      {
        id: 'uniud-pordenone',
        name: 'Centro Polifunzionale di Pordenone',
        city: 'Pordenone',
        address: 'Via Prasecco 3/A, 33170 Pordenone',
      },
      {
        id: 'uniud-gorizia',
        name: 'Polo Santa Chiara - Gorizia',
        city: 'Gorizia',
        address: 'Via Santa Chiara 1, Gorizia',
      },
      { id: 'uniud-gemona', name: 'Sede di Gemona del Friuli', city: 'Gemona del Friuli' },
    ],
  },
  {
    id: 'univr',
    name: 'Università degli Studi di Verona',
    shortName: 'UniVr',
    emailDomains: ['univr.it'],
    city: 'Verona',
    type: 'statale',
    campuses: [
      {
        id: 'univr-veronetta',
        name: 'Polo Zanotto (Veronetta)',
        city: 'Verona',
        address: 'Via San Francesco 22, 37129 Verona',
      },
      {
        id: 'univr-borgoroma',
        name: 'Polo di Borgo Roma (Medicina e Scienze)',
        city: 'Verona',
        address: 'Piazzale Ludovico Antonio Scuro 10, 37134 Verona',
      },
      { id: 'univr-vicenza', name: 'Sede di Vicenza', city: 'Vicenza' },
    ],
  },
  {
    id: 'uninsubria',
    name: "Università degli Studi dell'Insubria",
    shortName: 'Insubria',
    emailDomains: ['uninsubria.it'],
    city: 'Varese',
    type: 'statale',
    campuses: [
      {
        id: 'uninsubria-varese',
        name: 'Sede di Varese',
        city: 'Varese',
        address: 'Via Ravasi 2, 21100 Varese',
      },
      {
        id: 'uninsubria-como',
        name: 'Sede di Como',
        city: 'Como',
        address: 'Via Masia 27, 22100 Como',
      },
      { id: 'uninsubria-bustoarsizio', name: 'Sede di Busto Arsizio', city: 'Busto Arsizio' },
    ],
  },
  {
    id: 'unimol',
    name: 'Università degli Studi del Molise',
    shortName: 'UniMol',
    emailDomains: ['unimol.it', 'studenti.unimol.it'],
    city: 'Campobasso',
    type: 'statale',
    campuses: [
      {
        id: 'unimol-campobasso',
        name: 'Sede di Campobasso',
        city: 'Campobasso',
        address: 'Via Francesco De Sanctis, 86100 Campobasso',
      },
      {
        id: 'unimol-termoli',
        name: 'Sede di Termoli',
        city: 'Termoli',
        address: 'Via Duca degli Abruzzi 221, 86039 Termoli',
      },
      {
        id: 'unimol-isernia',
        name: 'Sede di Isernia',
        city: 'Isernia',
        address: 'Via Mazzini 8, 86170 Isernia',
      },
      { id: 'unimol-pesche', name: 'Sede di Pesche', city: 'Pesche' },
    ],
  },
  {
    id: 'unipmn',
    name: 'Università degli Studi del Piemonte Orientale "Amedeo Avogadro"',
    shortName: 'UniPmn',
    emailDomains: ['uniupo.it'],
    city: 'Alessandria',
    type: 'statale',
    campuses: [
      {
        id: 'unipmn-alessandria',
        name: 'Sede di Alessandria',
        city: 'Alessandria',
        address: 'Viale Teresa Michel 11, 15121 Alessandria',
      },
      {
        id: 'unipmn-novara',
        name: 'Sede di Novara',
        city: 'Novara',
        address: 'Via Ettore Perrone 18, 28100 Novara',
      },
      {
        id: 'unipmn-vercelli',
        name: 'Sede di Vercelli',
        city: 'Vercelli',
        address: 'Via Duomo 6, 13100 Vercelli',
      },
    ],
  },
  {
    id: 'unisannio',
    name: 'Università degli Studi del Sannio',
    shortName: 'UniSannio',
    emailDomains: ['unisannio.it'],
    city: 'Benevento',
    type: 'statale',
    campuses: [
      {
        id: 'unisannio-benevento',
        name: 'Sede di Palazzo San Domenico',
        city: 'Benevento',
        address: 'Piazza Guerrazzi 1, 82100 Benevento',
      },
    ],
  },
  {
    id: 'unicampania',
    name: 'Università degli Studi della Campania "Luigi Vanvitelli"',
    shortName: 'Vanvitelli',
    emailDomains: ['unicampania.it'],
    city: 'Caserta',
    type: 'statale',
    campuses: [
      {
        id: 'unicampania-caserta',
        name: 'Sede di Caserta (sede legale)',
        city: 'Caserta',
        address: 'Viale Abramo Lincoln 5, 81100 Caserta',
      },
      {
        id: 'unicampania-napoli',
        name: 'Sede di Napoli (Medicina e area sanitaria)',
        city: 'Napoli',
        address: 'Piazza Luigi Miraglia 2, 80138 Napoli',
      },
    ],
  },
  {
    id: 'unibas',
    name: 'Università degli Studi della Basilicata',
    shortName: 'UniBas',
    emailDomains: ['unibas.it'],
    city: 'Potenza',
    type: 'statale',
    campuses: [
      {
        id: 'unibas-macchiaromana',
        name: 'Campus di Macchia Romana (Polo Scientifico)',
        city: 'Potenza',
        address: "Via dell'Ateneo Lucano 10, 85100 Potenza",
      },
      {
        id: 'unibas-francioso',
        name: 'Polo del Francioso (Polo Letterario)',
        city: 'Potenza',
        address: 'Via Nazario Sauro 85, 85100 Potenza',
      },
      {
        id: 'unibas-matera',
        name: 'Campus di Matera',
        city: 'Matera',
        address: 'Via Lanera 20, 75100 Matera',
      },
    ],
  },
  {
    id: 'unitus',
    name: 'Università degli Studi della Tuscia',
    shortName: 'UniTus',
    emailDomains: ['unitus.it'],
    city: 'Viterbo',
    type: 'statale',
    campuses: [
      {
        id: 'unitus-viterbo',
        name: 'Campus di Viterbo',
        city: 'Viterbo',
        address: 'Via Santa Maria in Gradi 4, 01100 Viterbo',
      },
    ],
  },
  {
    id: 'unich',
    name: 'Università degli Studi "Gabriele D\'Annunzio" di Chieti e Pescara',
    shortName: 'UniCh',
    emailDomains: ['unich.it', 'studenti.unich.it'],
    city: 'Chieti',
    type: 'statale',
    campuses: [
      {
        id: 'unich-chieti',
        name: 'Campus di Chieti',
        city: 'Chieti',
        address: 'Via dei Vestini 31, 66100 Chieti',
      },
      {
        id: 'unich-pescara',
        name: 'Sede di Pescara',
        city: 'Pescara',
        address: 'Viale Pindaro 42, 65127 Pescara',
      },
    ],
  },
  {
    id: 'unior',
    name: 'Università degli Studi "L\'Orientale" di Napoli',
    shortName: 'UniOr',
    emailDomains: ['unior.it'],
    city: 'Napoli',
    type: 'statale',
    campuses: [],
  },
  {
    id: 'unirc',
    name: 'Università degli Studi Mediterranea di Reggio Calabria',
    shortName: 'UniRc',
    emailDomains: ['unirc.it'],
    city: 'Reggio Calabria',
    type: 'statale',
    campuses: [
      {
        id: 'unirc-feodivito',
        name: 'Campus di Feo di Vito',
        city: 'Reggio Calabria',
        address: "Via dell'Università 25, 89124 Reggio Calabria",
      },
    ],
  },
  {
    id: 'uniroma3',
    name: 'Università degli Studi Roma Tre',
    shortName: 'Roma Tre',
    emailDomains: ['uniroma3.it'],
    city: 'Roma',
    type: 'statale',
    campuses: [
      {
        id: 'uniroma3-ostiense',
        name: 'Polo di Ostiense (sede principale)',
        city: 'Roma',
        address: 'Via Ostiense 159, 00154 Roma',
      },
      {
        id: 'uniroma3-ostia',
        name: 'Polo Universitario di Ostia',
        city: 'Roma',
        address: 'Via Leopoldo Ori, 00122 Roma',
      },
    ],
  },
  {
    id: 'unisalento',
    name: 'Università del Salento',
    shortName: 'UniSalento',
    emailDomains: ['unisalento.it'],
    city: 'Lecce',
    type: 'statale',
    campuses: [
      {
        id: 'unisalento-lecce',
        name: 'Polo Urbano - Lecce',
        city: 'Lecce',
        address: 'Piazza Tancredi 7, 73100 Lecce',
      },
      {
        id: 'unisalento-extraurbano',
        name: 'Polo Extraurbano - Campus Ecotekne',
        city: 'Lecce',
        address: 'Via Monteroni, 73100 Lecce',
      },
      {
        id: 'unisalento-brindisi',
        name: 'Polo di Brindisi (Ingegneria, Scienze Sociali)',
        city: 'Brindisi',
      },
    ],
  },
  {
    id: 'unical',
    name: 'Università della Calabria',
    shortName: 'UniCal',
    emailDomains: ['unical.it'],
    city: 'Rende',
    type: 'statale',
    campuses: [
      {
        id: 'unical-arcavacata',
        name: 'Campus di Arcavacata',
        city: 'Rende',
        address: 'Via Pietro Bucci, 87036 Arcavacata di Rende',
      },
      { id: 'unical-crotone', name: 'Polo di Crotone', city: 'Crotone' },
      { id: 'unical-vibovalentia', name: 'Polo di Vibo Valentia', city: 'Vibo Valentia' },
    ],
  },
  {
    id: 'unipi',
    name: 'Università di Pisa',
    shortName: 'UniPi',
    emailDomains: ['unipi.it', 'studenti.unipi.it'],
    city: 'Pisa',
    type: 'statale',
    campuses: [
      {
        id: 'unipi-pisa',
        name: 'Sede di Pisa',
        city: 'Pisa',
        address: 'Lungarno Antonio Pacinotti 43, 56126 Pisa',
      },
      {
        id: 'unipi-livorno',
        name: 'Polo Universitario Sistemi Logistici - Livorno',
        city: 'Livorno',
      },
      { id: 'unipi-lucca', name: 'Sede di Lucca (Monte San Quirico)', city: 'Lucca' },
    ],
  },
  {
    id: 'unisi',
    name: 'Università degli Studi di Siena',
    shortName: 'UniSi',
    emailDomains: ['unisi.it', 'student.unisi.it'],
    city: 'Siena',
    type: 'statale',
    campuses: [
      {
        id: 'unisi-siena',
        name: 'Sede di Siena',
        city: 'Siena',
        address: 'Via Banchi di Sotto 55, 53100 Siena',
      },
      { id: 'unisi-arezzo', name: 'Campus di Arezzo (Polo del Pionta)', city: 'Arezzo' },
      { id: 'unisi-grosseto', name: 'Polo Universitario Grossetano', city: 'Grosseto' },
    ],
  },
  {
    id: 'iuav',
    name: 'Università Iuav di Venezia',
    shortName: 'IUAV',
    emailDomains: ['iuav.it'],
    city: 'Venezia',
    type: 'statale',
    campuses: [
      {
        id: 'iuav-tolentini',
        name: 'Sede di Santa Croce - Tolentini',
        city: 'Venezia',
        address: 'Santa Croce 191, 30135 Venezia',
      },
      {
        id: 'iuav-vicenza',
        name: 'Sede di Vicenza (Design)',
        city: 'Vicenza',
        address: 'Piazza San Biagio 1, Vicenza',
      },
    ],
  },
  {
    id: 'unistrapg',
    name: 'Università per Stranieri di Perugia',
    shortName: 'Stranieri Perugia',
    emailDomains: ['unistrapg.it'],
    city: 'Perugia',
    type: 'statale',
    campuses: [
      {
        id: 'unistrapg-gallenga',
        name: 'Sede di Palazzo Gallenga',
        city: 'Perugia',
        address: 'Piazza Fortebraccio 4, 06123 Perugia',
      },
    ],
  },
  {
    id: 'unistrasi',
    name: 'Università per Stranieri di Siena',
    shortName: 'Stranieri Siena',
    emailDomains: ['unistrasi.it'],
    city: 'Siena',
    type: 'statale',
    campuses: [
      {
        id: 'unistrasi-siena',
        name: 'Sede di Piazzale Carlo Rosselli',
        city: 'Siena',
        address: 'Piazzale Carlo Rosselli 27-28, 53100 Siena',
      },
    ],
  },
  {
    id: 'isuf',
    name: 'Istituto Italiano di Scienze Umane di Firenze',
    shortName: 'ISUF',
    emailDomains: [],
    city: 'Firenze',
    type: 'statale',
    // NOTE: l'istituto (SUM) è stato disattivato nel 2013 e incorporato nella Scuola Normale
    // Superiore di Pisa, diventando il suo "Istituto di Scienze Umane e Sociali". Non esiste più
    // come ente autonomo - valutare se rimuovere questa entry dal dataset.
    campuses: [
      {
        id: 'isuf-strozzi',
        name: 'Palazzo Strozzi (ora Istituto di Scienze Umane e Sociali - SNS)',
        city: 'Firenze',
        address: 'Piazza degli Strozzi, 50123 Firenze',
      },
    ],
  },

  // Private Universities
  {
    id: 'gssi',
    name: 'Gran Sasso Science Institute',
    shortName: 'GSSI',
    emailDomains: ['gssi.it'],
    city: "L'Aquila",
    type: 'privata',
    campuses: [
      {
        id: 'gssi-aquila',
        name: "Sede dell'Aquila - ex GIL",
        city: "L'Aquila",
        address: "Viale Francesco Crispi, 67100 L'Aquila",
      },
    ],
  },
  {
    id: 'humanitas',
    name: 'Humanitas University',
    shortName: 'Humanitas',
    emailDomains: ['humanitas-u.it'],
    city: 'Milano',
    type: 'privata',
    campuses: [
      { id: 'humanitas-pieveemanuele', name: 'Campus di Pieve Emanuele', city: 'Pieve Emanuele' },
    ],
  },
  {
    id: 'unibz',
    name: 'Libera Università di Bolzano',
    shortName: 'UniBz',
    emailDomains: ['unibz.it'],
    city: 'Bolzano',
    type: 'privata',
    campuses: [
      {
        id: 'unibz-bolzano',
        name: 'Sede di Bolzano (Economia, Scienze e Tecnologie, Informatica, Design)',
        city: 'Bolzano',
        address: 'Piazza Università 1, 39100 Bolzano',
      },
      {
        id: 'unibz-bressanone',
        name: 'Sede di Bressanone (Scienze della Formazione)',
        city: 'Bressanone',
        address: 'Viale Ratisbona 16, 39042 Bressanone',
      },
      { id: 'unibz-brunico', name: 'Sede di Brunico (Management del Turismo)', city: 'Brunico' },
    ],
  },
  {
    id: 'iulm',
    name: 'Libera Università di Lingue e Comunicazione (IULM) di Milano',
    shortName: 'IULM',
    emailDomains: ['iulm.it'],
    city: 'Milano',
    type: 'privata',
    campuses: [
      {
        id: 'iulm-milano',
        name: 'Campus di Milano - Via Carlo Bo',
        city: 'Milano',
        address: 'Via Carlo Bo 1, 20143 Milano',
      },
      { id: 'iulm-roma', name: 'Sede di Roma', city: 'Roma' },
    ],
  },
  {
    id: 'lumsa',
    name: 'Libera Università Maria SS. Assunta (LUMSA) di Roma',
    shortName: 'LUMSA',
    emailDomains: ['lumsa.it'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'lumsa-roma',
        name: 'Sede di Roma - Palazzo della Traspontina',
        city: 'Roma',
        address: 'Via della Traspontina 21, 00193 Roma',
      },
      {
        id: 'lumsa-palermo',
        name: 'Sede di Palermo',
        city: 'Palermo',
        address: 'Via Filippo Parlatore 65, 90145 Palermo',
      },
      { id: 'lumsa-taranto', name: 'Polo didattico di Taranto', city: 'Taranto' },
    ],
  },
  {
    id: 'lum',
    name: 'Libera Università Mediterranea "Giuseppe Degennaro"',
    shortName: 'LUM',
    emailDomains: ['lum.it'],
    city: 'Casamassima',
    type: 'privata',
    campuses: [
      {
        id: 'lum-casamassima',
        name: 'Campus Baricentro - Casamassima',
        city: 'Casamassima',
        address: 'S.S. 100 Km 18, 70010 Casamassima',
      },
      {
        id: 'lum-acquaviva',
        name: 'Sede di Acquaviva delle Fonti (Infermieristica)',
        city: 'Acquaviva delle Fonti',
      },
    ],
  },
  {
    id: 'unikore',
    name: 'Libera Università della Sicilia Centrale "Kore" di Enna',
    shortName: 'Kore Enna',
    emailDomains: ['unikore.it'],
    city: 'Enna',
    type: 'privata',
    campuses: [
      {
        id: 'unikore-enna',
        name: 'Cittadella Universitaria - Enna Bassa',
        city: 'Enna',
        address: 'Cittadella Universitaria, 94100 Enna',
      },
    ],
  },
  {
    id: 'unisr',
    name: 'Vita-Salute San Raffaele di Milano',
    shortName: 'San Raffaele',
    emailDomains: ['unisr.it'],
    city: 'Milano',
    type: 'privata',
    campuses: [
      {
        id: 'unisr-olgettina',
        name: 'Campus Olgettina (Ospedale San Raffaele)',
        city: 'Milano',
        address: 'Via Olgettina 58, 20132 Milano',
      },
      { id: 'unisr-mi2', name: 'Sede Mi2 - Centro Direzionale Milano 2', city: 'Segrate' },
    ],
  },
  {
    id: 'unilink',
    name: 'Link Campus University di Roma',
    shortName: 'Link Campus',
    emailDomains: ['unilink.it'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'unilink-roma',
        name: 'Sede di Roma - Casale di San Pio V',
        city: 'Roma',
        address: 'Via del Casale di San Pio V 44, 00165 Roma',
      },
      {
        id: 'unilink-cittadicastello',
        name: 'Sede di Città di Castello',
        city: 'Città di Castello',
      },
      { id: 'unilink-napoli', name: 'Sede di Napoli', city: 'Napoli' },
    ],
  },
  {
    id: 'luiss',
    name: 'LUISS Guido Carli di Roma',
    shortName: 'LUISS',
    emailDomains: ['luiss.it'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'luiss-pola',
        name: 'Sede di Viale Pola (Economia, Scienze Politiche)',
        city: 'Roma',
        address: 'Viale Pola 12, 00198 Roma',
      },
      {
        id: 'luiss-romania',
        name: 'Sede di Viale Romania (Impresa e Management)',
        city: 'Roma',
        address: 'Viale Romania 32, 00197 Roma',
      },
      {
        id: 'luiss-parenzo',
        name: 'Sede di Via Parenzo (Giurisprudenza)',
        city: 'Roma',
        address: 'Via Parenzo 11, 00198 Roma',
      },
    ],
  },
  {
    id: 'unicamillus',
    name: 'Saint Camillus International University of Health',
    shortName: 'UniCamillus',
    emailDomains: ['unicamillus.org'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'unicamillus-roma',
        name: "Campus di Via di Sant'Alessandro",
        city: 'Roma',
        address: "Via di Sant'Alessandro 8, 00131 Roma",
      },
    ],
  },
  {
    id: 'liuc',
    name: 'Università "Carlo Cattaneo" (LIUC)',
    shortName: 'LIUC',
    emailDomains: ['liuc.it'],
    city: 'Castellanza',
    type: 'privata',
    campuses: [
      {
        id: 'liuc-castellanza',
        name: 'Campus di Castellanza',
        city: 'Castellanza',
        address: 'Corso Matteotti 22, 21053 Castellanza',
      },
    ],
  },
  {
    id: 'unicampus',
    name: 'Università Campus Bio-Medico di Roma',
    shortName: 'Campus Bio-Medico',
    emailDomains: ['unicampus.it'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'unicampus-trigoria',
        name: 'Campus di Trigoria',
        city: 'Roma',
        address: 'Via Alvaro del Portillo 21, 00128 Roma',
      },
    ],
  },
  {
    id: 'unicatt',
    name: 'Università Cattolica del Sacro Cuore',
    shortName: 'Cattolica',
    emailDomains: ['unicatt.it'],
    city: 'Milano',
    type: 'privata',
    campuses: [
      {
        id: 'unicatt-milano',
        name: 'Sede di Milano',
        city: 'Milano',
        address: 'Largo Agostino Gemelli 1, 20123 Milano',
      },
      { id: 'unicatt-roma', name: 'Sede di Roma', city: 'Roma' },
      {
        id: 'unicatt-brescia',
        name: 'Sede di Brescia',
        city: 'Brescia',
        address: 'Via Trieste 17, 25121 Brescia',
      },
      {
        id: 'unicatt-piacenza',
        name: 'Sede di Piacenza-Cremona',
        city: 'Piacenza',
        address: 'Via Emilia Parmense 84, 29122 Piacenza',
      },
      { id: 'unicatt-campobasso', name: 'Sede di Campobasso', city: 'Campobasso' },
    ],
  },
  {
    id: 'unibocconi',
    name: 'Università Commerciale Luigi Bocconi di Milano',
    shortName: 'Bocconi',
    emailDomains: ['unibocconi.it'],
    city: 'Milano',
    type: 'privata',
    campuses: [
      {
        id: 'unibocconi-sarfatti',
        name: 'Campus di via Sarfatti',
        city: 'Milano',
        address: 'Via Roberto Sarfatti 25, 20136 Milano',
      },
    ],
  },
  {
    id: 'unisob',
    name: 'Università degli Studi Suor Orsola Benincasa di Napoli',
    shortName: 'Suor Orsola',
    emailDomains: ['unisob.na.it'],
    city: 'Napoli',
    type: 'privata',
    campuses: [
      {
        id: 'unisob-napoli',
        name: 'Sede di Napoli',
        city: 'Napoli',
        address: 'Corso Vittorio Emanuele 292, 80135 Napoli',
      },
      { id: 'unisob-pomigliano', name: "Sede di Pomigliano d'Arco", city: "Pomigliano d'Arco" },
      { id: 'unisob-salerno', name: 'Sede di Salerno', city: 'Salerno' },
    ],
  },
  {
    id: 'univda',
    name: "Università della Valle d'Aosta",
    shortName: 'UniVdA',
    emailDomains: ['univda.it'],
    city: 'Aosta',
    type: 'privata',
    campuses: [
      {
        id: 'univda-aosta',
        name: 'Campus universitario - Strada Cappuccini',
        city: 'Aosta',
        address: 'Strada Cappuccini 2A, 11100 Aosta',
      },
    ],
  },
  {
    id: 'unint',
    name: 'Università degli Studi Internazionali di Roma',
    shortName: 'UNINT',
    emailDomains: ['unint.eu'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'unint-colombo',
        name: 'Sede di Via Cristoforo Colombo',
        city: 'Roma',
        address: 'Via Cristoforo Colombo 200, 00147 Roma',
      },
      {
        id: 'unint-contirossini',
        name: 'Scuola di Alta Formazione - Via Conti Rossini',
        city: 'Roma',
        address: 'Via Carlo Conti Rossini 38, 00147 Roma',
      },
    ],
  },
  {
    id: 'unisg',
    name: 'Università di Scienze Gastronomiche',
    shortName: 'UniSG',
    emailDomains: ['unisg.it'],
    city: 'Pollenzo',
    type: 'privata',
    campuses: [
      {
        id: 'unisg-pollenzo',
        name: 'Agenzia di Pollenzo',
        city: 'Bra',
        address: 'Piazza Vittorio Emanuele 9, 12042 Pollenzo, Bra',
      },
    ],
  },
  {
    id: 'unier',
    name: 'Università Europea di Roma',
    shortName: 'UnIER',
    emailDomains: ['unier.it'],
    city: 'Roma',
    type: 'privata',
    campuses: [
      {
        id: 'unier-aldobrandeschi',
        name: 'Campus di Via degli Aldobrandeschi',
        city: 'Roma',
        address: 'Via degli Aldobrandeschi 190, 00163 Roma',
      },
    ],
  },
  {
    id: 'unidante',
    name: 'Università per Stranieri "Dante Alighieri" di Reggio Calabria',
    shortName: 'Dante Alighieri',
    emailDomains: ['unistrada.it'],
    city: 'Reggio Calabria',
    type: 'privata',
    campuses: [
      {
        id: 'unidante-reggio',
        name: 'Sede di Via del Torrione',
        city: 'Reggio Calabria',
        address: 'Via del Torrione 95, 89125 Reggio Calabria',
      },
    ],
  },
  {
    id: 'isef-lombardia',
    name: 'Istituto Superiore di Educazione Fisica della Lombardia',
    shortName: 'ISEF Lombardia',
    emailDomains: [],
    city: 'Milano',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-bologna',
    name: 'Istituto Superiore di Educazione Fisica di Bologna',
    shortName: 'ISEF Bologna',
    emailDomains: [],
    city: 'Bologna',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-firenze',
    name: 'Istituto Superiore di Educazione Fisica di Firenze',
    shortName: 'ISEF Firenze',
    emailDomains: [],
    city: 'Firenze',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-laquila',
    name: "Istituto Superiore di Educazione Fisica di L'Aquila",
    shortName: "ISEF L'Aquila",
    emailDomains: [],
    city: "L'Aquila",
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-milano',
    name: 'Istituto Superiore di Educazione Fisica di Milano',
    shortName: 'ISEF Milano',
    emailDomains: [],
    city: 'Milano',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-napoli',
    name: 'Istituto Superiore di Educazione Fisica di Napoli',
    shortName: 'ISEF Napoli',
    emailDomains: [],
    city: 'Napoli',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-palermo',
    name: 'Istituto Superiore di Educazione Fisica di Palermo',
    shortName: 'ISEF Palermo',
    emailDomains: [],
    city: 'Palermo',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-perugia',
    name: 'Istituto Superiore di Educazione Fisica di Perugia',
    shortName: 'ISEF Perugia',
    emailDomains: [],
    city: 'Perugia',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-torino',
    name: 'Istituto Superiore di Educazione Fisica di Torino',
    shortName: 'ISEF Torino',
    emailDomains: [],
    city: 'Torino',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },
  {
    id: 'isef-urbino',
    name: 'Istituto Superiore di Educazione Fisica di Urbino',
    shortName: 'ISEF Urbino',
    emailDomains: [],
    city: 'Urbino',
    type: 'privata',
    // NOTE: l'ISEF è stato soppresso dal D.Lgs. 178/1998, che ha trasformato gli Istituti
    // Superiori di Educazione Fisica nelle facoltà/corsi di laurea in Scienze Motorie delle
    // università ospitanti. Non esiste più come ente autonomo dal 1998-1999 - nessun campus
    // attuale da indicare.
    campuses: [],
  },

  // Telematic Universities
  {
    id: 'uniecampus',
    name: 'Università Telematica "e-Campus" di Novedrate',
    shortName: 'eCampus',
    emailDomains: ['uniecampus.it'],
    city: 'Novedrate',
    type: 'telematica',
    // NOTE: ateneo telematico - la didattica è online; questa è la sede legale/amministrativa,
    // non un campus per la frequenza ordinaria. Esistono inoltre decine di "sedi d'esame" sparse
    // sul territorio nazionale, non elencate qui in quanto non sono campus didattici.
    campuses: [
      {
        id: 'uniecampus-novedrate',
        name: 'Sede legale - Novedrate',
        city: 'Novedrate',
        address: 'Via Isimbardi 10, 22060 Novedrate',
      },
    ],
  },
  {
    id: 'unifortunato',
    name: 'Università Telematica "Giustino Fortunato" di Benevento',
    shortName: 'Fortunato',
    emailDomains: ['unifortunato.eu'],
    city: 'Benevento',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; sede istituzionale per esami e attività in
    // presenza. Sedi territoriali aggiuntive a Milano, Roma, Napoli, Padova, Palermo non elencate.
    campuses: [
      {
        id: 'unifortunato-benevento',
        name: 'Sede istituzionale - Benevento',
        city: 'Benevento',
        address: 'Viale Raffaele Delcogliano 12, 82100 Benevento',
      },
    ],
  },
  {
    id: 'iul',
    name: 'Università Telematica "Italian University Line" di Firenze',
    shortName: 'IUL',
    emailDomains: ['iuline.it'],
    city: 'Firenze',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; questa è la sede legale/amministrativa
    // (presso Indire). Le discussioni di laurea avvengono solo qui, gli esami in una rete di
    // ~49 sedi convenzionate su tutto il territorio nazionale, non elencate.
    campuses: [
      {
        id: 'iul-firenze',
        name: 'Sede legale - presso Indire',
        city: 'Firenze',
        address: 'Via Michelangelo Buonarroti 10, 50122 Firenze',
      },
    ],
  },
  {
    id: 'unipegaso',
    name: 'Università Telematica "Pegaso" di Napoli',
    shortName: 'Pegaso',
    emailDomains: ['unipegaso.it'],
    city: 'Napoli',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; questa è la sede legale, non un campus
    // ordinario. Pegaso ha oltre 90 sedi d'esame in Italia, non elencate qui.
    campuses: [{ id: 'unipegaso-napoli', name: 'Sede legale - Napoli', city: 'Napoli' }],
  },
  {
    id: 'unisanraffaele',
    name: 'Università Telematica "San Raffaele" di Roma',
    shortName: 'San Raffaele Roma',
    emailDomains: ['unisanraffaele.gnomon.it'],
    city: 'Roma',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; sede istituzionale per esami e segreteria.
    // Decine di sedi d'esame decentrate non elencate.
    campuses: [
      {
        id: 'unisanraffaele-roma',
        name: 'Sede di Val Cannuta',
        city: 'Roma',
        address: 'Via di Val Cannuta 247, 00166 Roma',
      },
    ],
  },
  {
    id: 'unimarconi',
    name: 'Università Telematica Guglielmo Marconi di Roma',
    shortName: 'Marconi',
    emailDomains: ['unimarconi.it'],
    city: 'Roma',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; questa è la sede legale/delle lezioni in
    // presenza, non un campus ordinario. Esistono inoltre sedi d'esame decentrate.
    campuses: [
      {
        id: 'unimarconi-roma',
        name: 'Sede di Via Paolo Emilio',
        city: 'Roma',
        address: 'Via Paolo Emilio 29, 00192 Roma',
      },
    ],
  },
  {
    id: 'uninettuno',
    name: 'Università Telematica Internazionale UNINETTUNO di Roma',
    shortName: 'UNINETTUNO',
    emailDomains: ['uninettunouniversity.net'],
    city: 'Roma',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; sede centrale per esami e segreteria.
    // Sedi d'esame decentrate anche all'estero non elencate.
    campuses: [
      {
        id: 'uninettuno-roma',
        name: 'Sede centrale - Corso Vittorio Emanuele II',
        city: 'Roma',
        address: 'Corso Vittorio Emanuele II 39, 00186 Roma',
      },
    ],
  },
  {
    id: 'unicusano',
    name: 'Università Telematica Niccolò Cusano di Roma',
    shortName: 'Cusano',
    emailDomains: ['unicusano.it'],
    city: 'Roma',
    type: 'telematica',
    // NOTE: ateneo telematico, ma con campus reale a Roma dove è possibile seguire lezioni in
    // presenza, oltre a numerose sedi d'esame decentrate non elencate qui.
    campuses: [{ id: 'unicusano-roma', name: 'Campus di Roma', city: 'Roma' }],
  },
  {
    id: 'unidav',
    name: 'Università Telematica Non Statale "Leonardo da Vinci"',
    shortName: 'Da Vinci',
    emailDomains: ['unidav.it'],
    city: 'Torrevecchia Teatina',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; sede legale e principale sede d'esame.
    campuses: [
      {
        id: 'unidav-torrevecchia',
        name: 'Sede legale - Torrevecchia Teatina',
        city: 'Torrevecchia Teatina',
        address: 'Piazza San Rocco 2, 66010 Torrevecchia Teatina',
      },
    ],
  },
  {
    id: 'unitelma',
    name: 'Università Telematica Unitelma Sapienza di Roma',
    shortName: 'Unitelma',
    emailDomains: ['unitelma.it'],
    city: 'Roma',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; sede legale per eventi istituzionali e
    // sedute di laurea (trasferita nel 2021 da Viale Regina Elena a Piazza Sassari).
    campuses: [
      {
        id: 'unitelma-roma',
        name: 'Sede centrale - Piazza Sassari',
        city: 'Roma',
        address: 'Piazza Sassari 4, 00161 Roma',
      },
    ],
  },
  {
    id: 'unimercatorum',
    name: 'Universitas Telematica Mercatorum di Roma',
    shortName: 'Mercatorum',
    emailDomains: ['unimercatorum.it'],
    city: 'Roma',
    type: 'telematica',
    // NOTE: ateneo telematico - didattica online; sede legale presso Palazzo Costaguti, nel
    // centro storico di Roma. Gli esami scritti si tengono nell'Hub Didattico "Spazio
    // Mercatorum"; numerose altre sedi d'esame decentrate non elencate.
    campuses: [{ id: 'unimercatorum-roma', name: 'Sede legale - Palazzo Costaguti', city: 'Roma' }],
  },
];
