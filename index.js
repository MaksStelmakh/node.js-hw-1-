const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");
const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --number <type>", "user number");

program.parse(process.argv);

const options = program.opts();

const invokeAction = async ({ action, id, name, email, number }) => {
  switch (action) {
    case "listContacts":
      const data = await listContacts();
      console.table(data);
      break;

    case "getContactById":
      const contact = getContactById(id).then((value) => {
        if (!value) {
          throw new Error(`Contact with id ${id} does not exist`);
          return;
        }

        console.log(value);
      });
      break;

    case "addContact":
      const newContact = await addContact(name, email, number);
      console.log(newContact);
      break;

    case "removeContact":
      const removed = await removeContact(id);
      if (!removed) {
        throw new Error(`Contact with id ${id} does not exist`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
