import { UsefulContact } from '@shared/types';
import { UniversityId } from './university.constants';

/**
 * Hand-curated "numeri utili" data, keyed by university id. Cineca exposes
 * no API for this category of data (centralino, URP, biblioteca, ecc.) -
 * every entry must be maintained manually.
 *
 * Deliberately kept separate from University in university.constants.ts -
 * same pattern already used for UniversityOrientationInfo: this is specific
 * to the Contatti Universitari feature, not a general university attribute.
 */
export const USEFUL_CONTACTS_BY_UNIVERSITY: Partial<Record<UniversityId, UsefulContact[]>> = {
  unimol: [
    {
      id: 'unimol-centralino',
      name: 'Centralino Università del Molise',
      description: "Numero generale dell'ateneo per informazioni e smistamento chiamate.",
      phone: '+39 0874 4041',
      hours: 'Lun–Ven 08:00–19:00',
    },
    {
      id: 'unimol-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'Reclami, segnalazioni e richieste di informazioni istituzionali.',
      phone: '+39 0874 404111',
      email: 'urp@unimol.it',
      hours: 'Lun–Ven 09:00–13:00',
    },
    {
      id: 'unimol-biblioteca',
      name: 'Biblioteca di Ateneo',
      description: 'Prestiti, consultazioni, accesso banche dati.',
      phone: '+39 0874 404600',
      email: 'biblioteca@unimol.it',
      hours: 'Lun–Ven 08:30–19:00 | Sab 08:30–13:00',
      campusId: 'unimol-campobasso',
    },
  ],
  // Verified 13/07/2026 - unich.etrasparenza.it, unich.it, dec.unich.it
  unich: [
    {
      id: 'unich-centralino-chieti',
      name: 'Centralino - Sede di Chieti',
      description:
        "Numero generale per la sede di Chieti (Via dei Vestini), sede legale dell'ateneo.",
      phone: '+39 0871 3551',
      campusId: 'unich-chieti',
    },
    {
      id: 'unich-centralino-pescara',
      name: 'Centralino - Sede di Pescara',
      description: 'Numero generale per la sede di Pescara (Viale Pindaro).',
      phone: '+39 085 45371',
      campusId: 'unich-pescara',
    },
    {
      id: 'unich-biblioteca-economia',
      name: 'Biblioteca - Dipartimento di Economia',
      description:
        'UniCh non ha una biblioteca centrale unica: le biblioteche sono organizzate per dipartimento, questo è il solo contatto verificato al momento.',
      phone: '+39 085 4537384',
      email: 'bibliodec@unich.it',
      hours: 'Lun–Ven 09:00–13:00',
      campusId: 'unich-pescara',
    },
  ],
  // Verified 13/07/2026 - https://trasparenza.polimi.it/pagina65_telefono-e-posta-elettronica.html
  polimi: [
    {
      id: 'polimi-centralino',
      name: 'Centralino Politecnico di Milano',
      description: "Centralino generale d'Ateneo",
      phone: '+39 02 2399 1',
    },
  ],
  // Verified 13/07/2026 - https://www.polito.it/en/contact-us
  polito: [
    {
      id: 'polito-centralino',
      name: 'Centralino Politecnico di Torino',
      description: "Numero informazioni generali d'Ateneo",
      phone: '+39 011 090 102',
    },
  ],
  // Verified 13/07/2026 - https://www.unive.it/pag/10601, https://www.unive.it/pag/10576
  unive: [
    {
      id: 'unive-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP / Call Center per informazioni e assistenza agli studenti',
      phone: '+39 041 234 7575',
      email: 'urp@unive.it',
      hours: 'mercoledì 14.30-16.30; giovedì 9.30-12.30',
    },
  ],
  // Verified 13/07/2026 - https://www.uniba.it/it/organizzazione/amm-centrale/dai/sezione-servizi-istituzionali/uo-urp-e-redazione-web/urp
  uniba: [
    {
      id: 'uniba-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: "Punto di accesso alle informazioni e ai servizi dell'Ateneo",
      phone: '+39 080 5211394',
      email: 'urp@uniba.it',
      hours: 'lun, mer, ven 9:00-12:00; mar, gio 9:00-12:00 e 14:30-16:00',
    },
  ],
  // Verified 13/07/2026 - https://www.unibo.it/it/ateneo/contatti
  unibo: [
    {
      id: 'unibo-centralino',
      name: 'Centralino Università di Bologna',
      description: "Centralino generale d'Ateneo",
      phone: '+39 051 2099111',
    },
  ],
  // Verified 13/07/2026 - https://unibs.portaleamministrazionetrasparente.it/pagina65_telefono-e-posta-elettronica.html
  unibs: [
    {
      id: 'unibs-centralino',
      name: 'Centralino Università degli Studi di Brescia',
      description: "Centralino generale d'Ateneo",
      phone: '+39 030 29881',
    },
  ],
  // Verified 13/07/2026 - https://web.unica.it/unica/en/contatti.page
  unica: [
    {
      id: 'unica-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: "Contatto e-mail dell'URP di Ateneo",
      email: 'urp@unica.it',
    },
  ],
  // Verified 13/07/2026 - https://www.unict.it/it/ateneo/urp
  unict: [
    {
      id: 'unict-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      phone: '+39 095 730 7777',
      email: 'urp@unict.it',
    },
  ],
  // Verified 13/07/2026 - https://www.unife.it/it/contatti, https://www.unife.it/it/urp
  unife: [
    {
      id: 'unife-centralino',
      name: 'Centralino Università degli Studi di Ferrara',
      description: "Centralino generale d'Ateneo",
      phone: '+39 0532 293111',
    },
    {
      id: 'unife-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      email: 'urp@unife.it',
    },
  ],
  // Verified 13/07/2026 - https://www.forlilpsi.unifi.it/upload/sub/Dipartimento_div/Modulistica/Manuali_uso/manuale_identita_visiva_UNIFI.pdf, https://www.unifi.it/en/university/communication/pro-public-relations-office
  unifi: [
    {
      id: 'unifi-centralino',
      name: 'Centralino Università degli Studi di Firenze',
      description: "Centralino generale d'Ateneo",
      phone: '+39 055 27571',
    },
    {
      id: 'unifi-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      phone: '+39 055 275 6046',
      email: 'urp@unifi.it',
      hours: 'lunedì-venerdì 9:00-13:00',
    },
  ],
  // Verified 13/07/2026 - https://unige.it/en/contacts, https://unige.it/faq
  unige: [
    {
      id: 'unige-centralino',
      name: 'Centralino Università degli Studi di Genova',
      description: "Centralino generale d'Ateneo",
      phone: '+39 010 20991',
      hours: 'lunedì-giovedì 8-17.30; venerdì 8-14',
    },
  ],
  // Verified 13/07/2026 - https://www.unime.it/amministrazione-trasparente, https://archivio.unime.it/it/ateneo/contatti
  unime: [
    {
      id: 'unime-centralino',
      name: 'Centralino Università degli Studi di Messina',
      description: "Centralino generale d'Ateneo",
      phone: '+39 090 6761',
    },
    {
      id: 'unime-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo (numero verde 800 230842)',
      phone: '+39 090 676 8310',
    },
  ],
  // Verified 13/07/2026 - https://www.unimi.it/it/ateneo/amministrazione-trasparente/organizzazione/telefono-e-posta-elettronica
  unimi: [
    {
      id: 'unimi-centralino',
      name: 'Centralino Università degli Studi di Milano',
      description:
        "Numero generale d'Ateneo (non etichettato esplicitamente come centralino sulla fonte ufficiale)",
      phone: '+39 02 5032 5032',
    },
  ],
  // Verified 13/07/2026 - https://trasparenza.unimib.it/pagina65_telefono-e-posta-elettronica.html, https://www.unimib.it/servizi/territorio/contatti
  unimib: [
    {
      id: 'unimib-centralino',
      name: 'Centralino Università degli Studi di Milano-Bicocca',
      description: "Centralino generale d'Ateneo",
      phone: '+39 02 6448 1',
    },
    {
      id: 'unimib-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      phone: '+39 02 6448 6130',
      email: 'urp@unimib.it',
    },
  ],
  // Verified 13/07/2026 - https://amministrazionetrasparente.unimore.it/, https://www.unimore.it/en/node/774
  unimore: [
    {
      id: 'unimore-centralino',
      name: 'Centralino Università degli Studi di Modena e Reggio Emilia',
      description: "Centralino generale d'Ateneo (sede di Modena)",
      phone: '+39 059 2056511',
    },
    {
      id: 'unimore-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      phone: '+39 059 205 6095',
      email: 'urp@unimore.it',
    },
  ],
  // Verified 13/07/2026 - https://www.csi.unina.it/telefonia
  unina: [
    {
      id: 'unina-centralino',
      name: 'Centralino Università degli Studi di Napoli Federico II',
      description: "Centralino telefonico d'Ateneo",
      phone: '+39 081 2531111',
    },
  ],
  // Verified 13/07/2026 - https://www.unipd.it/callcentre, https://www.unipd.it/trasparenza/telefono-posta-elettronica
  unipd: [
    {
      id: 'unipd-centralino',
      name: 'Centralino Università degli Studi di Padova',
      description: "Centralino generale d'Ateneo",
      phone: '+39 049 827 5111',
      hours: 'lunedì-venerdì 8.30-17',
    },
    {
      id: 'unipd-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo (Call Centre +39 049 827 3131)',
      email: 'urp@unipd.it',
    },
  ],
  // Verified 13/07/2026 - https://www.unipa.it/Recapiti-telefonici-generici/, https://www.unipa.it/amministrazione/areasistemiinformativieportalediateneo/settoreservizigeneraliinformaticidiateneo/gestioneemanutenzioneportalediateneo/portale-di-ateneo/portale-di-ateneo/contatti-e-assistenza/
  unipa: [
    {
      id: 'unipa-centralino',
      name: 'Centralino Università degli Studi di Palermo',
      description: 'Centralino amministrazione centrale',
      phone: '+39 091 238 25111',
    },
    {
      id: 'unipa-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      phone: '+39 091 238 93666',
      email: 'urp@unipa.it',
    },
  ],
  // Verified 13/07/2026 - https://trasparenza.unipr.it/pagina65_telefono-e-posta-elettronica.html
  unipr: [
    {
      id: 'unipr-centralino',
      name: 'Centralino Università degli Studi di Parma',
      description: "Centralino generale d'Ateneo",
      phone: '+39 0521 902111',
    },
  ],
  // Verified 13/07/2026 - https://unipv.portaleamministrazionetrasparente.it/pagina65_telefono-e-posta-elettronica.html
  unipv: [
    {
      id: 'unipv-centralino',
      name: 'Centralino Università degli Studi di Pavia',
      description: "Centralino generale d'Ateneo",
      phone: '+39 0382 984450',
    },
  ],
  // Verified 13/07/2026 - https://www.unipg.it/ateneo/protezione-dati-personali
  unipg: [
    {
      id: 'unipg-centralino',
      name: 'Centralino Università degli Studi di Perugia',
      description: "Centralino generale d'Ateneo",
      phone: '+39 075 5851',
    },
  ],
  // Verified 13/07/2026 - uniroma1.it (multiple official pages, cross-checked)
  uniroma1: [
    {
      id: 'uniroma1-centralino',
      name: 'Centralino Sapienza',
      description: "Numero generale dell'ateneo.",
      phone: '+39 06 49911',
      hours: 'Lun–Ven 08:00–18:00',
      campusId: 'uniroma1-citta-universitaria',
    },
  ],
  // Verified 13/07/2026 - http://urp.uniroma2.it/contatti/, https://web.uniroma2.it/contenuto/contatti_e_pec
  uniroma2: [
    {
      id: 'uniroma2-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      phone: '+39 06 7259 2542',
      email: 'urp@uniroma2.it',
    },
  ],
  // Verified 13/07/2026 - https://uniss.amministrazionetrasparente.cineca.it/pagina65_telefono-e-posta-elettronica.html, https://www.uniss.it/it/ateneo/il-nostro-ateneo/uniss-comunica
  uniss: [
    {
      id: 'uniss-centralino',
      name: 'Centralino Università degli Studi di Sassari',
      description: "Centralino generale d'Ateneo",
      phone: '+39 079 228211',
    },
    {
      id: 'uniss-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'Ufficio Comunicazione, relazioni con il pubblico e trasparenza',
      phone: '+39 079 228847',
    },
  ],
  // Verified 13/07/2026 - https://www.unito.it/node/2422
  unito: [
    {
      id: 'unito-centralino',
      name: 'Centralino Università degli Studi di Torino',
      description: "Centralino generale d'Ateneo",
      phone: '+39 011 6706111',
    },
  ],
  // Verified 13/07/2026 - https://www.units.it/operazionetrasparenza/?cod=contatti, https://portale.units.it/en/public-relations-office-urp
  units: [
    {
      id: 'units-centralino',
      name: 'Centralino Università degli Studi di Trieste',
      description: "Centralino generale d'Ateneo",
      phone: '+39 040 5587111',
    },
    {
      id: 'units-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      email: 'urp@amm.units.it',
    },
  ],
  // Verified 13/07/2026 - https://www.unicampania.it/?option=com_content&view=article&id=336&itemid=456
  unicampania: [
    {
      id: 'unicampania-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo (numero verde 800 252420)',
      phone: '+39 081 5666426',
    },
  ],
  // Verified 13/07/2026 - https://uniromatre.portaleamministrazionetrasparente.it/
  uniroma3: [
    {
      id: 'uniroma3-centralino',
      name: 'Centralino Università degli Studi Roma Tre',
      description: "Centralino generale d'Ateneo",
      phone: '+39 06 57332100',
    },
    {
      id: 'uniroma3-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'URP di Ateneo',
      email: 'infourp@uniroma3.it',
    },
  ],
  // Verified 13/07/2026 - https://www.unisalento.it/amministrazione-centrale
  unisalento: [
    {
      id: 'unisalento-centralino',
      name: 'Centralino Università del Salento',
      description: "Centralino generale d'Ateneo",
      phone: '+39 0832 291111',
    },
  ],
  // Verified 13/07/2026 - https://old.unipi.it/index.php/documenti-ateneo/item/267-contatti, https://www.unipi.it/index.php/contattiurp
  unipi: [
    {
      id: 'unipi-centralino',
      name: 'Centralino Università di Pisa',
      description: "Centralino generale d'Ateneo",
      phone: '+39 050 221 2111',
    },
    {
      id: 'unipi-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'Unità Relazioni con il Pubblico',
      phone: '+39 050 2212914',
      email: 'urp@unipi.it',
    },
  ],
  // Verified 13/07/2026 - https://www.luiss.it/contatti, https://biblioteca.luiss.it/en/contacts
  luiss: [
    {
      id: 'luiss-centralino',
      name: 'Centralino LUISS Guido Carli',
      description: "Centralino generale d'Ateneo",
      phone: '+39 06 852251',
    },
    {
      id: 'luiss-biblioteca',
      name: 'Biblioteca LUISS',
      description: 'Biblioteca di Ateneo',
      phone: '+39 06 8522 5600',
      email: 'biblioteca@luiss.it',
    },
  ],
  // Verified 13/07/2026 - https://milano.unicatt.it/il-campus-dove-siamo
  unicatt: [
    {
      id: 'unicatt-centralino',
      name: 'Centralino Università Cattolica del Sacro Cuore',
      description: 'Centralino generale (sede di Milano)',
      phone: '+39 02 7234 1',
    },
    {
      id: 'unicatt-urp',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description: 'Rapporti con il pubblico (sede di Milano)',
      phone: '+39 02 7234 3893',
      email: 'urp@unicatt.it',
    },
    {
      id: 'unicatt-biblioteca',
      name: 'Biblioteca Università Cattolica',
      description: 'Biblioteca (sede di Milano)',
      phone: '+39 02 7234 3849',
      email: 'biblioteca@unicatt.it',
    },
  ],

  // ── Atenei senza contatto verificato da fonte ufficiale entro il budget di ricerca ──
  // Placeholder esplicito: nessun numero/email è stato inventato o dedotto.
  // Vanno verificati manualmente sui rispettivi portali trasparenza/etrasparenza.it.
  casd: [
    {
      id: 'casd-non-disponibile',
      name: 'Centro Alti Studi per la Difesa',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  iusspavia: [
    {
      id: 'iusspavia-non-disponibile',
      name: 'Istituto Universitario di Studi Superiori di Pavia',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  poliba: [
    {
      id: 'poliba-non-disponibile',
      name: 'Politecnico di Bari',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  imtlucca: [
    {
      id: 'imtlucca-non-disponibile',
      name: 'Scuola IMT Alti Studi di Lucca',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  sissa: [
    {
      id: 'sissa-non-disponibile',
      name: 'Scuola Internazionale Superiore di Studi Avanzati di Trieste',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  sns: [
    {
      id: 'sns-non-disponibile',
      name: 'Scuola Normale Superiore di Pisa',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  ssm: [
    {
      id: 'ssm-non-disponibile',
      name: 'Scuola Superiore Meridionale di Napoli',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  sssup: [
    {
      id: 'sssup-non-disponibile',
      name: "Scuola Superiore Sant'Anna di Pisa",
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  uniurb: [
    {
      id: 'uniurb-non-disponibile',
      name: 'Università degli Studi "Carlo Bo" di Urbino',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  univpm: [
    {
      id: 'univpm-non-disponibile',
      name: 'Università Politecnica delle Marche',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unibg: [
    {
      id: 'unibg-non-disponibile',
      name: 'Università degli Studi di Bergamo',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unicam: [
    {
      id: 'unicam-non-disponibile',
      name: 'Università degli Studi di Camerino',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unicas: [
    {
      id: 'unicas-non-disponibile',
      name: 'Università degli Studi di Cassino e del Lazio Meridionale',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unicz: [
    {
      id: 'unicz-non-disponibile',
      name: 'Università degli Studi di Catanzaro - Magna Graecia',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unifg: [
    {
      id: 'unifg-non-disponibile',
      name: 'Università degli Studi di Foggia',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  univaq: [
    {
      id: 'univaq-non-disponibile',
      name: "Università degli Studi dell'Aquila",
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unimc: [
    {
      id: 'unimc-non-disponibile',
      name: 'Università degli Studi di Macerata',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  uniparthenope: [
    {
      id: 'uniparthenope-non-disponibile',
      name: 'Università degli Studi di Napoli Parthenope',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  iusm: [
    {
      id: 'iusm-non-disponibile',
      name: 'Università degli Studi di Roma "Foro Italico"',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unite: [
    {
      id: 'unite-non-disponibile',
      name: 'Università degli Studi di Teramo',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  uniud: [
    {
      id: 'uniud-non-disponibile',
      name: 'Università degli Studi di Udine',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unitn: [
    {
      id: 'unitn-non-disponibile',
      name: 'Università degli Studi di Trento',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  uninsubria: [
    {
      id: 'uninsubria-non-disponibile',
      name: "Università degli Studi dell'Insubria",
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unipmn: [
    {
      id: 'unipmn-non-disponibile',
      name: 'Università degli Studi del Piemonte Orientale "Amedeo Avogadro"',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unisannio: [
    {
      id: 'unisannio-non-disponibile',
      name: 'Università degli Studi del Sannio',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unibas: [
    {
      id: 'unibas-non-disponibile',
      name: 'Università degli Studi della Basilicata',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unitus: [
    {
      id: 'unitus-non-disponibile',
      name: 'Università degli Studi della Tuscia',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unior: [
    {
      id: 'unior-non-disponibile',
      name: 'Università degli Studi "L\'Orientale" di Napoli',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unirc: [
    {
      id: 'unirc-non-disponibile',
      name: 'Università degli Studi Mediterranea di Reggio Calabria',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unical: [
    {
      id: 'unical-non-disponibile',
      name: 'Università della Calabria',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unisi: [
    {
      id: 'unisi-non-disponibile',
      name: 'Università degli Studi di Siena',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  iuav: [
    {
      id: 'iuav-non-disponibile',
      name: 'Università Iuav di Venezia',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unistrapg: [
    {
      id: 'unistrapg-non-disponibile',
      name: 'Università per Stranieri di Perugia',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unistrasi: [
    {
      id: 'unistrasi-non-disponibile',
      name: 'Università per Stranieri di Siena',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  gssi: [
    {
      id: 'gssi-non-disponibile',
      name: 'Gran Sasso Science Institute',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  humanitas: [
    {
      id: 'humanitas-non-disponibile',
      name: 'Humanitas University',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unibz: [
    {
      id: 'unibz-non-disponibile',
      name: 'Libera Università di Bolzano',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  iulm: [
    {
      id: 'iulm-non-disponibile',
      name: 'Libera Università di Lingue e Comunicazione (IULM) di Milano',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  lumsa: [
    {
      id: 'lumsa-non-disponibile',
      name: 'Libera Università Maria SS. Assunta (LUMSA) di Roma',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  lum: [
    {
      id: 'lum-non-disponibile',
      name: 'Libera Università Mediterranea "Giuseppe Degennaro"',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unikore: [
    {
      id: 'unikore-non-disponibile',
      name: 'Libera Università della Sicilia Centrale "Kore" di Enna',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unisr: [
    {
      id: 'unisr-non-disponibile',
      name: 'Vita-Salute San Raffaele di Milano',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unilink: [
    {
      id: 'unilink-non-disponibile',
      name: 'Link Campus University di Roma',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unibocconi: [
    {
      id: 'unibocconi-non-disponibile',
      name: 'Università Commerciale Luigi Bocconi di Milano',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unicamillus: [
    {
      id: 'unicamillus-non-disponibile',
      name: 'Saint Camillus International University of Health',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  liuc: [
    {
      id: 'liuc-non-disponibile',
      name: 'Università "Carlo Cattaneo" (LIUC)',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unicampus: [
    {
      id: 'unicampus-non-disponibile',
      name: 'Università Campus Bio-Medico di Roma',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unisob: [
    {
      id: 'unisob-non-disponibile',
      name: 'Università degli Studi Suor Orsola Benincasa di Napoli',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  univda: [
    {
      id: 'univda-non-disponibile',
      name: "Università della Valle d'Aosta",
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unint: [
    {
      id: 'unint-non-disponibile',
      name: 'Università degli Studi Internazionali di Roma',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unisg: [
    {
      id: 'unisg-non-disponibile',
      name: 'Università di Scienze Gastronomiche',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unier: [
    {
      id: 'unier-non-disponibile',
      name: 'Università Europea di Roma',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
  unidante: [
    {
      id: 'unidante-non-disponibile',
      name: 'Università per Stranieri "Dante Alighieri" di Reggio Calabria',
      description: 'Dato non disponibile - nessun contatto verificato da fonte ufficiale.',
    },
  ],
};

/**
 * Safe lookup by a runtime string (e.g. from localStorage), which may not
 * be a valid UniversityId if data is stale/corrupted. The cast here is the
 * single, intentional trust boundary between "arbitrary string from
 * storage" and the strict UniversityId type - always falls back to an
 * empty array rather than throwing.
 */
export function getUsefulContacts(universityId: string): UsefulContact[] {
  return USEFUL_CONTACTS_BY_UNIVERSITY[universityId as UniversityId] ?? [];
}
