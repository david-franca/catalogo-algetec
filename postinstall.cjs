const fse = require('fs-extra');
const path = require('path');

const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir, 'public', 'tinymce'),
  { overwrite: true });

// Copia o plugin MathType para o diretório público
fse.copySync(
    path.join(topDir, "node_modules", "@wiris", "mathtype-tinymce6"),
    path.join(topDir, "public", "tinymce", "plugins", "tiny_mce_wiris"),
    { overwrite: true }
  );

// Copia o arquivo pdf.worker.mjs para o diretório público
fse.copySync(
  path.join(topDir, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.mjs'),
  path.join(topDir, 'public', 'pdf.worker.mjs'),
  { overwrite: true }
);

// Sobrescreve o arquivo zh-CN.js com o conteúdo do pt-BR.js
const proChatLocalePath = path.join(topDir, 'node_modules', '@ant-design', 'pro-chat', 'es', 'locale');
const zhCNFilePath = path.join(proChatLocalePath, 'zh-CN.js');
const ptBRFilePath = path.join(topDir, 'src', 'locales', 'pro-chat', 'pt-BR.js');

// Copia o conteúdo do pt-BR.js para o zh-CN.js
fse.copySync(ptBRFilePath, zhCNFilePath, { overwrite: true });