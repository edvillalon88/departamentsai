const { default: OpenAI } = require("openai");

class LLMClass{

    constructor(llmProvider = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] })){
        this.llmProvider = llmProvider;
    }

    async chat(messages, model = 'gpt-4o-mini'){
        const { choices } = await this.llmProvider.chat.completions.create({ messages, model});
        const { message } = choices.pop();
        return message.content;
    }

}
module.exports = LLMClass;