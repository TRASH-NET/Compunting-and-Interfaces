import java.util.InputMismatchException;
import java.util.Scanner;

public class Utils {

    // ? ANSI codes for colors
    public static final String BLUE = "\033[0;34m";
    public static final String YELLOW = "\033[0;33m";
    public static final String RESET = "\033[0m";
    public static final String RED = "\033[0;31m";
    public static final String GREEN = "\033[0;32m";
    public static final String CYAN = "\033[0;36m";


    public static int getValidInteger(Scanner scanner, String prompt, int min, int max) {
        int number = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print(prompt);
            try {
                number = scanner.nextInt();
                if (number < min || number > max) {
                    System.out.println(RED + "Número inválido. Por favor, ingrese un número entre " + min + " y " + max + RESET);
                } else {
                    valid = true;
                }
            } catch (InputMismatchException e) {
                System.out.println(RED + "Entrada inválida. Por favor, ingrese un número válido." + RESET);
                scanner.next();
            }
        }
        return number;
    }

    public static double getValidDouble(Scanner scanner, String prompt, double min, double max) {
        double number = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print(prompt);
            try {
                number = scanner.nextDouble();
                if (number < min || number > max) {
                    System.out.println(RED + "Número inválido. Por favor, ingrese un número entre " + min + " y " + max + RESET);
                } else {
                    valid = true;
                }
            } catch (InputMismatchException e) {
                System.out.println(RED + "Entrada inválida. Por favor, ingrese un número válido." + RESET);
                scanner.next();
            }
        }
        return number;
    }

    public static double getValidPositiveDouble(Scanner scanner, String prompt) {
        double number = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print(prompt);
            try {
                number = scanner.nextDouble();
                if (number <= 0) {
                    System.out.println(RED + "El número debe ser positivo." + RESET);
                } else {
                    valid = true;
                }
            } catch (InputMismatchException e) {
                System.out.println(RED + "Entrada inválida. Por favor, ingrese un número positivo." + RESET);
                scanner.next();
            }
        }
        return number;
    }

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
                    System.out.println(RED + "Opción inválida. Por favor, ingrese un número entre " + min + " y "
                            + max + RESET);
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

    public static boolean askToContinue(Scanner scanner) {
        String response = "";
        boolean valid = false;

        while (!valid) {
            System.out.print(YELLOW + "¿Desea realizar otra acción? (s/n): " + RESET);
            response = scanner.next().trim().toLowerCase();

            if (response.equals("s") || response.equals("n")) {
                valid = true;
            } else {
                System.out.println(RED + "Entrada inválida. Por favor, ingrese 's' para sí o 'n' para no." + RESET);
            }
        }

        return response.equals("s");
    }
}