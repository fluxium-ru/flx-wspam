// made by fluxium.ru
// version 1.0
// todo:
// - add CLI for easier usage
// - potentially package and deploy
import inquirer from 'inquirer';
import gradient, { pastel } from 'gradient-string';
import chalk from 'chalk';

const title = `
 ██░ ██ ▓█████  ██▀███   ███▄ ▄███▓▓█████   ██████ 
▓██░ ██▒▓█   ▀ ▓██ ▒ ██▒▓██▒▀█▀ ██▒▓█   ▀ ▒██    ▒ 
▒██▀▀██░▒███   ▓██ ░▄█ ▒▓██    ▓██░▒███   ░ ▓██▄   
░▓█ ░██ ▒▓█  ▄ ▒██▀▀█▄  ▒██    ▒██ ▒▓█  ▄   ▒   ██▒
░▓█▒░██▓░▒████▒░██▓ ▒██▒▒██▒   ░██▒░▒████▒▒██████▒▒
 ▒ ░░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░   ░  ░░░ ▒░ ░▒ ▒▓▒ ▒ ░
 ▒ ░▒░ ░ ░ ░  ░  ░▒ ░ ▒░░  ░      ░ ░ ░  ░░ ░▒  ░ ░
 ░  ░░ ░   ░     ░░   ░ ░      ░      ░   ░  ░  ░  
 ░  ░  ░   ░  ░   ░            ░      ░  ░      ░  
`


type DiscordWebhookPayload = {
    content: string,
}

type InputAnswer = {
    value: string,
}

class FlxWspam {
    private webhookURL: string // place webhook url here
    private count: number;
    private payload: DiscordWebhookPayload;

    constructor() {
        this.webhookURL = "";
        this.count = 1;
        this.payload = { content: "fluxium.ru for more! "};
    }

    public async sendPayload(payload: DiscordWebhookPayload, count: number): Promise<void> {
        for (let i = 0; i < count; i++) {
            try {
                const response = await fetch(this.webhookURL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload)
                        });

                        if (response.ok) {
                            console.log('Message sent successfully!');
                        } else {
                            // server responded w error
                            console.error('Error encountered, failed: ', response.status, response.statusText);
                        }
            } catch (error) {
                // network or other errors
                console.error('Error sending message: ', error);
            }
        }
    };

    public async renderMenu() {
        console.clear();
        console.log(pastel.multiline(title));
        const answers = await inquirer.prompt([
            {
                type: 'select',
                name: 'optionMenu1',
                message: 'Choose an option:',
                choices: [
                    {
                        name: `Set URL | ${chalk.green(this.webhookURL) || chalk.red("not set")}`,
                        value: "SET_URL"
                    },
                    {
                        name: `Set Count | ${chalk.green(this.count) || chalk.red("not set")}`,
                        value: "SET_COUNT"
                    },
                    {
                        name: `Set Content | ${chalk.green(this.payload.content) || chalk.red("not set")}`,
                        value: "SET_CONTENT"
                    },
                    {
                        name: "Send",
                        value: "SEND"
                    },
                    {
                        name: "Quit",
                        value: "QUIT"
                    }
                ]
            }
        ]);
        switch (answers.optionMenu1) {
            case "SET_URL":
                this.webhookURL = await this.askInput("Enter webhook URL: ");
                console.log(chalk.green("Webhook URL set."));
                console.clear();
                break;

            case "SET_COUNT":
                this.count = Number(await this.askInput("Enter message count: "));
                break;
            
            case "SET_CONTENT":
                this.payload = { content: await this.askInput("Enter message content: ") };
                break;

            case "SEND":
                await this.sendPayload(this.payload, this.count);
                break;

            case "QUIT":
                process.exit(1);
                break;
        }
        this.renderMenu();
    }

    public async askInput(prompt: string): Promise<string> {
        const answer = await inquirer.prompt<InputAnswer>([
            {
                type: 'input',
                name: 'value',
                message: prompt,
            }
        ]);
        return answer.value;
    }
}

const mySpam = new FlxWspam();
mySpam.renderMenu();