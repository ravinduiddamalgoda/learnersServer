const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '',
});

const GetResponse = async (req, res) => {
    console.log("===================chatbot====================")
    try {
        // Retrieve the question from the route parameters
        const userQuestion = req.body.question;

        // Check if userQuestion is empty or null
        if (!userQuestion) {
            return res.status(400).json({ error: 'Please provide a question in the route parameters.' });
        }

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: userQuestion }],
            model: 'gpt-3.5-turbo',
        });
        console.log("==========================================")
        const responseContent = chatCompletion.choices[0].message.content;
        console.log("==========================================")
        res.status(200).json({ response: responseContent });
    } catch (error) {
        console.log("===================error==================")
        console.error(error)
        console.log("===================error==================")
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    GetResponse,
};
