import java.util.InputMismatchException;
import java.util.Scanner;

public class Utils {

    //?  ANSI codes for colors
    public static final String BLUE = "\033[0;34m";
    public static final String YELLOW = "\033[0;33m";
    public static final String RESET = "\033[0m";
    public static final String RED = "\033[0;31m";
    public static final String GREEN = "\033[0;32m";
    public static final String CYAN = "\033[0;36m";

    public static void clearConsole() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }

    public static int getValidOption(Scanner scanner, int min, int max) {
        int option = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print("Ingrese una opción: ");
            try {
                option = scanner.nextInt();
                if (option < min || option > max) {
                    System.out.println(RED + "Opción inválida. Por favor, ingrese un número entre " + min + " y " + max + RESET);
                } else {
                    valid = true;
                }
            } catch (InputMismatchException e) {
                System.out.println(RED + "Entrada inválida. Por favor, ingrese un número válido." + RESET);
                scanner.next();
            }
        }
        return option;
    }

    public static String getValidName(Scanner scanner, String prompt) {
        String name;
        while (true) {
            System.out.print(prompt);
            name = scanner.nextLine().trim();
            if (name.matches("^[a-zA-Z]{1,20}$")) {
                return name;
            } else {
                System.out.println(RED + "El nombre debe contener solo letras, sin espacios o caracteres especiales, y debe tener entre 1 y 20 caracteres." + RESET);
            }
        }
    }

    public static String getValidPhone(Scanner scanner, String prompt) {
        String phone;
        while (true) {
            System.out.print(prompt);
            phone = scanner.nextLine().trim();
            if (phone.matches("^3\\d{9}$")) {
                return phone;
            } else {
                System.out.println(RED + "El número de teléfono debe tener 10 dígitos y comenzar con 3." + RESET);
            }
        }
    }

    public static String getValidEmail(Scanner scanner, String prompt) {
        String email;
        while (true) {
            System.out.print(prompt);
            email = scanner.nextLine().trim();
            if (email.matches("^[\\w-\\.]+@[\\w-\\.]+\\.com$")) {
                return email;
            } else {
                System.out.println(RED + "El correo electrónico debe tener una estructura válida, como 'ejemplo@dominio.com'."+ RESET);
            }
        }
    }

    public static boolean askToContinue(Scanner scanner) {
        System.out.print(YELLOW + "¿Desea realizar otra acción? (s/n): " + RESET);
        String response = scanner.next().trim().toLowerCase();
        return response.equals("s");
    }
}
