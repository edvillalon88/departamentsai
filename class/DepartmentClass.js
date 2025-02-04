const FileManagmentClass = require('./FileManagmentClass');
const csv = require('csvtojson');
const LLMClass = require('./LLMClass');
const Prompts = require('../Prompts');

class DepartametClass{

    constructor(){

    }

    async getDepartmentDataFromCSV(filePath) {
        try {
            const csvData = await FileManagmentClass.readFile(filePath);
            const jsonData = await csv().fromString(csvData);
            return jsonData;
        } catch (error) {
            console.error('Error reading CSV file:', error);
            throw error;
        }
    }

    async completeAndGetDepartamentDescription(depertamentData, llmProvider = new LLMClass()){
        const messages = [{ role: "system", content: Prompts }];
        const departamentDescriptions = [];
        let index = 1;
        for (const item of depertamentData) {
            const response = await llmProvider.chat([ ...messages, { role: "user", content: JSON.stringify(item) } ]);
            departamentDescriptions.push(response);
            await new Promise(resolve => setTimeout(resolve, 200)); // Espera entre llamadas
            console.log("item.name", index, depertamentData.length);
            index++;
        }

        return departamentDescriptions.join('\n######\n\n');
    }

    saveDepartamentsDescriptions(filePath, departamentDescriptionsContent){
        return FileManagmentClass.createFile(filePath, departamentDescriptionsContent)
    }

    async proccessDepartaments(inputPath, outputPath){
        try {
            const departmentsData = await this.getDepartmentDataFromCSV(inputPath);
            const departmentsDecriptionContent = await this.completeAndGetDepartamentDescription(departmentsData);
            await this.saveDepartamentsDescriptions(outputPath, departmentsDecriptionContent);
        } catch (error) {
            console.log('error', error);
        }
    }



}
module.exports = DepartametClass