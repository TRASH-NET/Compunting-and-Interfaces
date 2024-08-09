import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        Agenda agenda = new Agenda();
        boolean keepRunning = true;

        while (keepRunning) {
            Utils.clearConsole();
            System.out.println(Utils.CYAN + "             ------------------------");
            System.out.println("            | MI AGENDA DE CONTACTOS |");
            System.out.println("             ------------------------" + Utils.RESET + "\n");
            System.out.println(Utils.YELLOW + "1. " + Utils.RESET + "Mostrar todos los contactos");
            System.out.println(Utils.YELLOW + "2. " + Utils.RESET + "Buscar contacto por nombre");
            System.out.println(Utils.YELLOW + "3. " + Utils.RESET + "Agregar nuevo contacto");
            System.out.println(Utils.YELLOW + "4. " + Utils.RESET + "Editar un contacto");
            System.out.println(Utils.YELLOW + "5. " + Utils.RESET + "Eliminar un contacto");
            System.out.println(Utils.YELLOW + "6. " + Utils.RESET + "Salir" + "\n");
            System.out.print(Utils.GREEN + "¿Qué desea realizar?" + Utils.RESET + "\n\n");

            int option = Utils.getValidOption(scanner, 1, 6);

            scanner.nextLine();

            switch (option) {
                case 1:
                    Utils.clearConsole();
                    agenda.showContacts(scanner);
                    break;
                case 2:
                    System.out.print("Ingrese el nombre del contacto: ");
                    String name = scanner.nextLine();
                    agenda.showContact(name);
                    break;
                case 3:
                    String newName = Utils.getValidName(scanner, "Ingrese el nombre del contacto: ");
                    String lastName = Utils.getValidName(scanner, "Ingrese el apellido del contacto: ");
                    String phone = Utils.getValidPhone(scanner, "Ingrese el número de teléfono del contacto: ");
                    String email = Utils.getValidEmail(scanner, "Ingrese el correo electrónico del contacto: ");
                    Person newContact = new Person(newName, lastName, phone, email);
                    agenda.addContact(newContact);
                    break;
                case 4:
                    String editName = Utils.getValidName(scanner, "\nIngrese el nombre del contacto a editar: ");
                    
                    Person contactToEdit = agenda.getContact(editName);
                    if (contactToEdit == null) {
                        System.out.println(Utils.RED + "Contacto no encontrado." + Utils.RESET);
                        break;
                    }
                    
                    agenda.showContact(editName);
                    
                    System.out.println(Utils.YELLOW + "\n" + "¿Qué desea editar?" + Utils.RESET + "\n");
                    System.out.println(Utils.YELLOW + "1. " + Utils.RESET +  "Nombre");
                    System.out.println(Utils.YELLOW + "2. " + Utils.RESET +  "Apellido");
                    System.out.println(Utils.YELLOW + "3. " + Utils.RESET +  "Teléfono");
                    System.out.println(Utils.YELLOW + "4. " + Utils.RESET +  "Correo electrónico\n");
                    
                    int editOption = Utils.getValidOption(scanner, 1, 4);

                    scanner.nextLine();
                    
                    String editNewName = contactToEdit.getName();
                    String editLastName = contactToEdit.getLastName();
                    String editPhone = contactToEdit.getPhone();
                    String editEmail = contactToEdit.getEmail();
                    
                    switch (editOption) {
                        case 1:
                            editNewName = Utils.getValidName(scanner, "Ingrese el nuevo nombre: ");
                            break;
                        case 2:
                            editLastName = Utils.getValidName(scanner, "Ingrese el nuevo apellido: ");
                            break;
                        case 3:
                            editPhone = Utils.getValidPhone(scanner, "Ingrese el nuevo número de teléfono: ");
                            break;
                        case 4:
                            editEmail = Utils.getValidEmail(scanner, "Ingrese el nuevo correo electrónico: ");
                            break;
                        default:
                            System.out.println(Utils.RED + "Opción inválida, por favor intente de nuevo." + Utils.RESET);
                            break;
                    }
                    
                    Person updatedContact = new Person(
                        editNewName,
                        editLastName,
                        editPhone,
                        editEmail
                    );
                    
                    agenda.editContact(editName, updatedContact);
                    agenda.showContact(updatedContact.getName());
                    break;
                case 5:
                    System.out.print("Ingrese el nombre del contacto a eliminar: ");
                    String deleteName = scanner.nextLine();
                    agenda.deleteContact(deleteName);
                    break;
                case 6:
                    System.out.println(Utils.RED + "Saliendo del programa." + Utils.RESET);
                    scanner.close();
                    return;
                default:
                    System.out.println(Utils.RED + "Opción inválida, por favor intente de nuevo." + Utils.RESET);
            }

            if (keepRunning) {
                keepRunning = Utils.askToContinue(scanner);
            }
        }
    }
}
