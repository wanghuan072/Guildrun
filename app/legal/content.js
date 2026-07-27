import { siteConfig } from "@/src/seo/siteConfig";

export const legalData = {
  privacyPolicy: {
    eyebrow: "Legal · Privacy",
    intro:
      "This Privacy Policy explains how the Guildrun website handles routine technical information when you browse its guides, databases, and connected pages.",
    sections: [
      {
        title: "Information handled during a visit",
        paragraphs: [
          "The website uses Google Analytics to understand aggregate visits and page usage. It may process details such as the requested page, visit time, browser and device type, approximate region, and referring page. This information is used to understand which local guides and databases are useful and to identify technical problems.",
          "We do not ask visitors to create an account, submit a gameplay profile, or complete a contact form. If you send an email voluntarily, the address and message content are used only to understand and respond to that communication.",
        ],
      },
      {
        title: "Google Analytics and browser controls",
        paragraphs: [
          "Google Analytics may use cookies or similar browser identifiers to distinguish visits and produce aggregate reports. Google handles that information under its own privacy terms; this website does not receive a visitor's Google account password or private gameplay data.",
          "You can restrict or remove cookies, use browser privacy controls, or block analytics scripts at any time. The guides and local databases remain readable without creating an account.",
        ],
      },
      {
        title: "External links and retention",
        paragraphs: [
          "Pages may link to game storefronts, community services, or other websites. Those services operate under their own privacy practices, and opening an external link leaves this website.",
          "Technical logs are kept only as long as reasonably needed for security, performance, troubleshooting, and legal obligations. Email messages may be retained while a question, correction, or rights concern is being handled.",
        ],
      },
      {
        title: "Your choices and contact",
        paragraphs: [
          "You may use browser controls to limit cookies and can ask about personal information included in an email conversation. Requests should describe the relevant message and the action requested so the issue can be located without collecting extra information.",
          `Privacy questions can be sent to ${siteConfig.contactEmail}. This policy may change when website features or applicable requirements change; the revised text will appear on this page.`,
        ],
      },
    ],
  },
  termsOfService: {
    eyebrow: "Legal · Terms",
    intro:
      "These Terms of Service describe the conditions for using the Guildrun website and its gameplay articles, searchable records, navigation tools, and related materials.",
    sections: [
      {
        title: "Acceptable website use",
        paragraphs: [
          "You may read, link to, and use the website for personal, informational, and non-commercial gameplay planning. You must not interfere with website operation, bypass technical limits, introduce harmful code, scrape at a disruptive rate, or present the website as your own service.",
          "Automated access must respect published technical controls and reasonable request rates. Access may be restricted when activity threatens availability, security, or the experience of other visitors.",
        ],
      },
      {
        title: "Gameplay information and availability",
        paragraphs: [
          "Game values, balance, availability, and mechanics can change between builds. Articles explain the version and context where practical, but no page guarantees a particular result, drop, build outcome, release schedule, or future feature.",
          "The website may be changed, reorganized, suspended, or discontinued without advance notice. Links can also lead to third-party services whose availability and terms are outside this website's control.",
        ],
      },
      {
        title: "Intellectual property and limitations",
        paragraphs: [
          "Original website writing, organization, and presentation may not be republished in bulk or sold without permission. Guildrun names, game art, trademarks, and other game materials remain the property of their respective rights holders.",
          "The website is provided on an as-available basis. To the extent permitted by law, the operator is not liable for losses arising from reliance on gameplay advice, interruptions, external services, or changes to the game.",
        ],
      },
      {
        title: "Changes and questions",
        paragraphs: [
          "Continued use after updated terms are posted means you accept the revised terms. If a provision cannot be enforced, the remaining provisions continue to apply.",
          `Questions about these terms can be sent to ${siteConfig.contactEmail}.`,
        ],
      },
    ],
  },
  copyright: {
    eyebrow: "Legal · Copyright",
    intro:
      "This notice explains the treatment of original website material, Guildrun game material, trademarks, personal use, and rights-holder communications.",
    sections: [
      {
        title: "Website material",
        paragraphs: [
          "Original explanatory text, page organization, interface design, and custom presentation created for this website are protected by applicable copyright rules. Visitors may quote short passages with clear attribution and may link directly to relevant pages.",
          "Bulk copying, automated republication, resale, or creation of a substantially duplicated website is not permitted without written authorization.",
        ],
      },
      {
        title: "Game names and materials",
        paragraphs: [
          "Guildrun names, logos, characters, artwork, interface imagery, and other game-related materials belong to their respective rights holders. Their appearance is for identification, commentary, and gameplay reference.",
          "Nothing on this website grants ownership of a game trademark, character, image, sound, or software asset.",
        ],
      },
      {
        title: "Rights-holder requests",
        paragraphs: [
          "A rights holder or authorized representative may request review of material believed to infringe a protected work. The request should identify the work, the page address, the disputed material, the requested action, and reliable contact details.",
          `Send copyright communications to ${siteConfig.contactEmail}. Incomplete requests may require additional information before the relevant material can be located and assessed.`,
        ],
      },
    ],
  },
  aboutUs: {
    eyebrow: "Legal · About",
    intro:
      "Guildrun Guide is organized to help players move from broad gameplay questions to specific heroes, items, relics, enemies, stages, and decisions without losing context.",
    sections: [
      {
        title: "What the website is designed to do",
        paragraphs: [
          "The site combines a learn-to-play path with searchable databases. Gameplay pages explain the decision loop; directory pages support comparison; detail pages preserve the values, mechanics, relationships, and tactical implications needed for a specific choice.",
          "Internal links are added when they help a reader answer the next likely question, such as moving from Burn rules to equipment that applies Burn or from an enemy ability to the stage where that enemy appears.",
        ],
      },
      {
        title: "How content is maintained",
        paragraphs: [
          "Fixed names and numerical records are kept distinct from situational strategy. Version labels and update dates help readers understand when balance-sensitive advice may need reconsideration.",
          "Strategy is written as decision frameworks rather than universal tier lists. A strong choice depends on formation, available triggers, enemy behavior, economy, difficulty, and the next route node.",
        ],
      },
      {
        title: "Corrections and accessibility",
        paragraphs: [
          "Clear corrections are welcome when a number, relationship, link, or explanation is wrong. Accessibility and navigation reports are also useful because a database is only valuable when people can reach and understand the records.",
          `Questions and corrections can be sent to ${siteConfig.contactEmail}.`,
        ],
      },
    ],
  },
  contactUs: {
    eyebrow: "Legal · Contact",
    intro:
      "Use the published email address for factual corrections, accessibility concerns, copyright matters, technical problems, or general questions about Guildrun Guide.",
    sections: [
      {
        title: "How to contact the website",
        paragraphs: [
          `Email ${siteConfig.contactEmail}. There is no contact form and no account is required.`,
          "For a factual correction, include the page address, the text or value in question, the game version if relevant, and a concise explanation of the proposed correction. For a technical issue, include the device, browser, page address, and what happened.",
        ],
      },
      {
        title: "Copyright and privacy messages",
        paragraphs: [
          "Copyright messages should identify the protected work, the page containing the material, the requested action, and contact information for the rights holder or authorized representative.",
          "Privacy questions should identify the relevant email conversation or website interaction without adding unnecessary personal information.",
        ],
      },
      {
        title: "Response expectations",
        paragraphs: [
          "Messages are prioritized by impact. Broken access, credible rights concerns, and clear factual errors may be handled before broad suggestions or build requests.",
          "Sending a message does not create a service agreement or guarantee that a suggested change will be accepted, but specific and reproducible details make a useful response more likely.",
        ],
      },
    ],
  },
};
