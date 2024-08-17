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

    public static String getValidStringInput(Scanner scanner, String prompt) {
        System.out.print(prompt);
        String input = scanner.nextLine();
        while (input == null || input.trim().isEmpty()) {
            System.out.print(RED + "Entrada inválida. " + RESET + prompt);
            input = scanner.nextLine();
        }
        return input;
    }

    public static double getValidDoubleInput(Scanner scanner, String prompt) {
        double value = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print(prompt);
            String input = scanner.nextLine();

            try {
                if (input.isEmpty()) {
                    System.out.println(RED + "La entrada no puede estar vacía. Inténtelo de nuevo." + RESET);
                    continue;
                }

                value = Double.parseDouble(input);

                if (value <= 0) {
                    System.out.println(RED + "El valor debe ser mayor que 0. Inténtelo de nuevo." + RESET);
                } else {
                    valid = true;
                }
            } catch (NumberFormatException e) {
                System.out.println(RED + "Entrada inválida. Ingrese un número válido." + RESET);
            }
        }
        return value;
    }

    public static int getValidIntInput(Scanner scanner, String prompt) {
        int value = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print(prompt);
            String input = scanner.nextLine();

            try {
                if (input.isEmpty()) {
                    System.out.println(RED + "La entrada no puede estar vacía. Inténtelo de nuevo." + RESET);
                    continue;
                }

                value = Integer.parseInt(input);

                if (value <= 0) {
                    System.out.println(RED + "El valor debe ser mayor que 0 y entero. Inténtelo de nuevo." + RESET);
                } else {
                    valid = true;
                }
            } catch (NumberFormatException e) {
                System.out.println(RED + "Entrada inválida. Ingrese un número entero válido." + RESET);
            }
        }
        return value;
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
                    System.out.println(
                            RED + "Opción inválida. Por favor, ingrese un número entre " + min + " y " + max + RESET);
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
        boolean validInput = false;
    
        while (!validInput) {
            System.out.print(YELLOW + "¿Desea realizar otra acción? (s/n): " + RESET);
            response = scanner.next().trim().toLowerCase();
    
            if (response.equals("s") || response.equals("n")) {
                validInput = true;
            } else {
                System.out.println(RED + "Entrada inválida. Por favor, ingrese 's' para sí o 'n' para no." + RESET);
            }
        }
    
        return response.equals("s");
    }
}
