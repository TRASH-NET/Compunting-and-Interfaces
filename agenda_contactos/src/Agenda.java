import java.util.Scanner;

public class Agenda {
    private Person[] contacts;

    public Agenda() {
        this.contacts = new Person[0];
    }

    public void addContact(Person contact) {
        Person[] newContacts = new Person[this.contacts.length + 1];
        for (int i = 0; i < this.contacts.length; i++) {
            newContacts[i] = this.contacts[i];
        }
        newContacts[this.contacts.length] = contact;
        this.contacts = newContacts;
        System.out.println("\n\n\n" + Utils.GREEN + "¡Contacto agregado exitosamente!" + Utils.RESET + "\n");
    }

    public void showContacts(Scanner scanner) {
        if (this.contacts.length == 0) {
            System.out.println("\n\n\n" + Utils.BLUE + "¡Su lista de contactos está vacía!" + Utils.RESET + "\n");
        } else {
            for (int i = 0; i < this.contacts.length; i++) {
                System.out.println(Utils.CYAN + "\n\n\tContacto " + (i + 1) + Utils.RESET);
                System.out.println(this.contacts[i].toString());
            }
        }
    }

    public void showContact(String name) {
        boolean found = false;
    
        for (int i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].getName().equalsIgnoreCase(name)) {
                found = true;
                System.out.println(Utils.CYAN + "\n\tContacto " + (i + 1) + Utils.RESET);
                System.out.println(this.contacts[i].toString());
            }
        }
    
        if (!found) {
            System.out.println(Utils.RED + "Contacto no encontrado." + Utils.RESET);
        }
    }

    public Person getContact(String name) {
        for (Person contact : this.contacts) {
            if (contact.getName().equalsIgnoreCase(name)) {
                return contact;
            }
        }
        return null;
    }

    public void editContact(String name, Person updatedContact) {
        boolean contactFound = false;
        
        for (int i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].getName().equalsIgnoreCase(name)) {
                this.contacts[i] = updatedContact;
                contactFound = true;
                break;
            }
        }
        
        if (contactFound) {
            System.out.println(Utils.GREEN + "¡ Contacto actualizado exitosamente. !" + Utils.RESET);
        } else {
            System.out.println(Utils.RED + "Contacto no encontrado." + Utils.RESET);
        }
    }

    public void deleteContact(String name) {
        boolean contactFound = false;
        for (Person contact : this.contacts) {
            if (contact.getName().equalsIgnoreCase(name)) {
                contactFound = true;
                break;
            }
        }
    
        if (!contactFound) {
            System.out.println(Utils.RED + "Contacto no encontrado." + Utils.RESET);
            return;
        }
    
        Person[] newContacts = new Person[this.contacts.length - 1];
        int j = 0;
        for (int i = 0; i < this.contacts.length; i++) {
            if (!this.contacts[i].getName().equalsIgnoreCase(name)) {
                newContacts[j] = this.contacts[i];
                j++;
            }
        }
        this.contacts = newContacts;
        System.out.println("\n" + Utils.GREEN + "¡Contacto eliminado exitosamente!" + Utils.RESET + "\n");
    }
}
