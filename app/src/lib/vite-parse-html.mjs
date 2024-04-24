// taken from https://github.com/KanadeHu/vite-plugin-parse-html, but with some minor changes
import { createFilter } from "@rollup/pluginutils";
import { render } from "ejs";
import { minify as minifyTerser } from "html-minifier-terser";

const htmlFilter = createFilter(["**/*.html"]);

function resetOptions(isMinify) {
  return {
    collapseWhitespace: isMinify,
    keepClosingSlash: isMinify,
    removeComments: isMinify,
    minifyCSS: isMinify,
  };
}

function minify({ isMinify = true }) {
  return {
    name: "vite: minify-html",
    order: "post",
    /**
     * you can refer to the official documents https://www.rollupjs.org/guide/en/#generatebundle
     * @param _options
     * @param bundle
     */
    async generateBundle(_options, bundle) {
      if (isMinify) {
        for await (const item of Object.values(bundle)) {
          if (item.type === "asset" && htmlFilter(item.fileName) && typeof item.source === "string") {
            item.source = await minifyTerser(item.source, resetOptions(isMinify));
          }
        }
      }
    },
  };
}

const judgeFileType = url => {
  if (url.indexOf(".css") !== -1) {
    return "css";
  }

  if (url.indexOf(".js") !== -1) {
    return "javascript";
  }
};

/**
 * @description reset sources options
 * @param sources {Array<SourceItem>} sources option
 * @returns HtmlTagDescriptor tags
 */
function resetTags(sources) {
  const result = [];

  if (!sources.length) {
    return result;
  }

  sources.forEach(item => {
    if (typeof item === "string") {
      return result.push({
        tag: judgeFileType(item) === "css" ? "link" : "script",
        attrs: {
          [judgeFileType(item) === "css" ? "herf" : "src"]: item,
        },
        injectTo: "head",
      });
    }

    return result.push({
      tag: item.type === "javascript" ? "script" : "link",
      attrs: {
        [item.type === "javascript" ? "src" : "herf"]: item.url,
        ...item.attrs,
      },
      injectTo: item.position || "head",
    });
  });

  return result;
}

export function filterOptions(options, path) {
  if (!(options instanceof Array)) {
    return options;
  }

  const option = options
    .map(i => (i.path ? { path: "/index.html", ...i } : i))
    .filter(i => i.path && i.path.indexOf(path) >= 0);

  if (!option.length) return {};

  return option[0];
}

/**
 * @param options
 * @description inject some variable scripts css to main html
 * @returns {object} vite plugin
 */

function inject(options) {
  return {
    name: "vite-parse-html",
    order: "pre",
    transformIndexHtml: {
      order: "pre",
      async handler(html, ctx) {
        const { data = {}, ejsOptions = {}, sources = [] } = filterOptions(options, ctx.path);

        return {
          html: await render(html, data, ejsOptions),
          tags: resetTags(sources),
        };
      },
    },
  };
}

export default options => {
  const { inject: injectOpt = {}, minifyOpt: minifyOpt = {} } = options;

  return [inject(injectOpt), minify(minifyOpt)];
};

// single export
export { inject, minify };
