class PostTableOfContents {
  constructor(API, name, config) {
    this.API = API;
    this.name = name;
    this.config = config;
  }


  addInsertions() {
    // Add custom CSS and JS files
    this.API.addInsertion('publiiHead', this.addStyles, 1, this);
    this.API.addInsertion('publiiFooter', this.addScripts, 1, this);
  }


  addModifiers() {
    // Use the addModifier method to modify the post text
    this.API.addModifier('postText', this.customTOC, 1, this);
  }


  addEvents() {
  }


  // Method to add custom CSS files
  addStyles(rendererInstance) {
    return `<link rel="stylesheet" href="${rendererInstance.siteConfig.domain}/media/plugins/collapsibleToC/toc.css" />`;
  }


  // Method to add custom JS files
  addScripts(rendererInstance) {
    // Add jQuery and our script that implements the expand/collapse behaviour of the ToC
    let scripts = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>'
    scripts += `<script src="${rendererInstance.siteConfig.domain}/media/plugins/collapsibleToC/toc.js"></script>`;
    
    return scripts;
  }


  customTOC(rendererInstance, text) {
    // Define all vars to find headings (h2, h3) in the text
    const headingRegex = /<(h[2-3])[^>]*>(.*?)<\/\1>/g;
    const headings = [];
    let match;


    // Collect all headings and their positions
    while ((match = headingRegex.exec(text)) !== null) {
      const tag = match[1];
      const content = match[2];
      const id = `toc-${headings.length}`;

      // Add ID to heading for anchor linking
      text = text.replace(match[0], `<${tag} id="${id}">${content}</${tag}>`);

      // Add heading data to the array to build the ToC later
      headings.push({ tag, content, id });
    }


    // If no headings found, return original text
    if (headings.length === 0) return text;


    // Create the Table of Contents
    let toc = '<div id="divTOC" class="post__toc">';
    toc += '<h3 id="h3TOC">Table of Contents</h3>';
    toc += '<ul id="ulTOC" class="toc">';

    for(let counter = 0; counter < headings.length; counter++) {
      let element = headings[counter];
      let previousElement = headings[counter-1]

      if (element["tag"] === 'h2') { // If the element is h2
        if (counter !== 0) { // All elements except for the first
          // Close the sublist if the previous heading was h3
          if(previousElement["tag"] === "h3") {
            toc += '</ul>';
          }

          // Close the </li> tag of the previous h2
          toc += '</li>';
        }

        toc += `<li class="toc-h2"><a href="#${element["id"]}">${element["content"]}</a>`;
      } else if (element["tag"] === 'h3') { // If the element is h3
        if (counter !== 0) { // All elements except for the first
          if (previousElement["tag"] === "h2") {
            toc += '<ul>';
          }
        }

        toc += `<li class="toc-h3"><a href="#${element["id"]}">${element["content"]}</a></li>`;
      }
    }

    toc += '</ul>';
    toc += '<span class="more-less"></span>'; // The element that collapses the ToC
    toc += '</div>';


    // Look for a placeholder [toc] and replace it
    if (text.includes('<p>[toc]</p>')) {
      text = text.replace('<p>[toc]</p>', toc);
    }


    return text; // Return the modified post text
  }
}


module.exports = PostTableOfContents;