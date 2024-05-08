import fs from 'fs';
import yaml from 'js-yaml';

// Read YAML file
const inputFilePath = 'antora-playbook.yml';
const outputFilePath = 'playbook-local.yml';

const yamlData = fs.readFileSync(inputFilePath, 'utf8');
const parsedData = yaml.load(yamlData);
parsedData.content.sources[0].url = '../manual'
parsedData.content.sources[1].url = '../integration'
parsedData.site.url = 'http://localhost:3000'
// Write parsed YAML data to another file
const yamlString = yaml.dump(parsedData);
fs.writeFileSync(outputFilePath, yamlString, 'utf8');

console.log('YAML file successfully written to', outputFilePath);
