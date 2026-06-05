// made by fluxium.ru
// version 1.0
// todo:
// - add CLI for easier usage
// - potentially package and deploy
import inquirer from 'inquirer';


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
    content: string
}

const myPayload: DiscordWebhookPayload = { content: "CONTENT_HERE!" }

class FlxWspam {
    private webhookURL: string = "REMOVED" // place webhook url here

    public async sendPayload(): Promise<void> {
        try {
            const response = await fetch(this.webhookURL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(myPayload)
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
    };

    public async init() {
        console.log(title);
        const answers = await inquirer.prompt([
            {
                type: 'select',
                name: 'optionMenu1',
                message: 'Choose an option:',
                choices: ['Set URL', 'Set Count', 'Set Content', 'Send']
            }
        ])
        console.log(answers.optionMenu1);
    }
}

const mySpam = new FlxWspam();
mySpam.init();