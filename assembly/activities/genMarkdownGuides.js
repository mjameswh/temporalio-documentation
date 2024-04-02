import fs from "fs-extra";
import path from "path";
import { localRef } from "../common/index.js";

const plannedText = `Content is planned but not yet available.`;

const enableDebugHelpers = process.env.DEBUG_HELPERS?.toLowerCase() === "true";

export async function genMarkdownGuides(config) {
  console.log(`generating the full markdown for all guides...`);
  const matchedGuidesPath = path.join(config.root_dir, config.temp_write_dir, config.attached_nodes_file_name);
  let matchedGuides = await fs.readJSON(matchedGuidesPath);
  const updatedGuides = [];
  for (let guideCfg of matchedGuides.cfgs) {
    guideCfg = await generateGuide(config, guideCfg);
    updatedGuides.push(guideCfg);
  }
  matchedGuides.cfgs = updatedGuides;
  await fs.writeJSON(matchedGuidesPath, matchedGuides);
  return;
}

async function generateGuide(config, guideCfg) {
  console.log(`generating ${guideCfg.title}`);
  let guideStr = await frontmatter(guideCfg);
  for (const section of guideCfg.sections) {
    if (enableDebugHelpers) {
      guideStr = `${guideStr}<SourceFile location="${section.node.file_path?.replace(config.root_dir, "")}">\n`;
    }
    switch (section.type) {
      case "h2":
        if (section.node.tags && Array.isArray(section.node.tags) && section.node.tags.includes("cli reference")) {
          guideStr = `${guideStr}## ${section.node.label}\n\n`;
        } else {
          guideStr = `${guideStr}## ${section.node.title} {#${localRef(section.node.id, section.node.label)}}\n\n`;
        }
        guideStr = `${guideStr}${ssdi(section.node.ssdi)}`;
        guideStr = `${guideStr}${section.node.markdown_content}\n\n`;
        break;
      case "h3":
        if (section.node.tags && Array.isArray(section.node.tags) && section.node.tags.includes("cli reference")) {
          guideStr = `${guideStr}### ${section.node.label}\n\n`;
        } else {
          guideStr = `${guideStr}### ${section.node.title} {#${localRef(section.node.id, section.node.label)}}\n\n`;
        }
        guideStr = `${guideStr}${ssdi(section.node.ssdi)}`;
        guideStr = `${guideStr}${section.node.markdown_content}\n\n`;
        break;
      case "h4":
        if (section.node.tags && Array.isArray(section.node.tags) && section.node.tags.includes("cli reference")) {
          guideStr = `${guideStr}#### ${section.node.label}\n\n`;
        } else {
          guideStr = `${guideStr}#### ${section.node.title} {#${localRef(section.node.id, section.node.label)}}\n\n`;
        }
        guideStr = `${guideStr}${ssdi(section.node.ssdi)}`;
        guideStr = `${guideStr}${section.node.markdown_content}\n\n`;
        break;
      case "p":
        guideStr = `${guideStr}${ssdi(section.node.ssdi)}`;
        guideStr = `${guideStr}${section.node.markdown_content}\n\n`;
        break;
      case "langtabs":
        const tabStr = await generateLangTabs(section.langtabs);
        guideStr = `${guideStr}${tabStr}`;
        break;
      default:
        console.log("unhandled section type...");
        console.log(JSON.stringify(section));
    }
    if (enableDebugHelpers) {
      guideStr = `${guideStr}</SourceFile>\n`;
    }
  }
  guideCfg.markdown_content = guideStr;
  await writeGuide(config, guideCfg);
  return guideCfg;
}

function ssdi(ssdi) {
  let infoStr = "";
  if (ssdi.length > 0) {
    infoStr = `:::tip Support, stability, and dependency info\n`;
    for (const item of ssdi) {
      infoStr = `${infoStr}- ${item}\n`;
    }
    infoStr = `${infoStr}\n:::\n\n`;
  }
  return infoStr;
}

async function generateLangTabs(langtabs) {
  let tabStr = `<Tabs\n`;
  const unavailable = "Content is not available";
  tabStr = `${tabStr}defaultValue="go"\n`;
  tabStr = `${tabStr}queryString="lang"\n`;
  tabStr = `${tabStr}values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'},{label: 'PHP', value: 'php'},{label: 'Python', value: 'python'},{label: 'TypeScript', value: 'typescript'},]}>\n\n`;
  for (const tab of langtabs) {
    tabStr = `${tabStr}<TabItem value="${tab.lang}">\n\n`;
    if (tab.id == "none") {
      tabStr = `${tabStr}${plannedText}\n\n`;
    } else if (tab.id == "na") {
      tabStr = `${tabStr}Not applicable to this SDK.\n\n`;
    } else {
      tabStr = `${tabStr}${ssdi(tab.node.ssdi)}`;
      tabStr = `${tabStr}${tab.node.markdown_content}\n\n`;
    }
    tabStr = `${tabStr}</TabItem>\n`;
  }
  tabStr = `${tabStr}</Tabs>\n\n`;
  return tabStr;
}

async function frontmatter(guideCfg) {
  let guideStr = `---\n`;
  guideStr = `${guideStr}id: ${guideCfg.id}\n`;
  guideStr = `${guideStr}title: ${guideCfg.title}\n`;
  guideStr = `${guideStr}sidebar_label: ${guideCfg.sidebar_label}\n`;
  if (guideCfg.sidebar_position != undefined) {
    guideStr = `${guideStr}sidebar_position: ${guideCfg.sidebar_position}\n`;
  }
  guideStr = `${guideStr}description: ${guideCfg.description}\n`;
  if (guideCfg.slug != undefined) {
    guideStr = `${guideStr}slug: ${guideCfg.slug}\n`;
  }
  guideStr = `${guideStr}toc_max_heading_level: ${guideCfg.toc_max_heading_level}\n`;
  guideStr = `${guideStr}${genKeywordsMatter(guideCfg)}`;
  guideStr = `${guideStr}${genTagsMatter(guideCfg)}`;
  guideStr = `${guideStr}---\n\n`;
  guideStr = `${guideStr}<!-- THIS FILE IS GENERATED. DO NOT EDIT THIS FILE DIRECTLY -->\n\n`;
  if (guideCfg.add_tabs_support) {
    guideStr = `${guideStr}import Tabs from '@theme/Tabs';\n`;
    guideStr = `${guideStr}import TabItem from '@theme/TabItem';\n\n`;
  }
  if (enableDebugHelpers) {
    guideStr = `${guideStr}import SourceFile from '@theme/SourceFile';\n\n`;
  }
  if (guideCfg.use_description) {
    guideStr = `${guideStr}${guideCfg.description}\n\n`;
  }
  return guideStr;
}

function genTagsMatter(guideCfg) {
  let s = "tags:\n";
  const tags = [];
  for (const section of guideCfg.sections) {
    const sectionTags = section?.node?.tags ? section.node.tags : [];
    for (const tag of sectionTags) {
      if (!alreadyThere(tag, tags)) {
        tags.push(tag);
      }
    }
  }
  tags.sort();
  for (const t of tags) {
    s = `${s}- ${localRef(guideCfg.id, t)}\n`;
  }
  return s;
}
function genKeywordsMatter(guideCfg) {
  let s = "keywords:\n";
  const keywords = [];
  for (const section of guideCfg.sections) {
    const sectionKWs = section?.node?.tags ? section.node.tags : [];
    for (const kw of sectionKWs) {
      if (!alreadyThere(kw, keywords)) {
        keywords.push(kw);
      }
    }
  }
  keywords.sort();
  for (const kw of keywords) {
    s = `${s}- ${(guideCfg.id, kw)}\n`;
  }
  return s;
}
function alreadyThere(add, list) {
  for (const l of list) {
    if (add == l) {
      return true;
    }
  }
  return false;
}
async function writeGuide(config, guideCfg) {
  let writePath = "";
  if (guideCfg.file_dir != "/") {
    writePath = path.join(config.root_dir, config.content_write_dir, guideCfg.file_dir, guideCfg.file_name);
  } else {
    writePath = path.join(config.root_dir, config.content_write_dir, guideCfg.file_name);
  }
  await fs.mkdir(path.dirname(writePath), { recursive: true }).catch((err) => {
    console.error(err);
  });
  await fs.writeFile(writePath, guideCfg.markdown_content);
}
