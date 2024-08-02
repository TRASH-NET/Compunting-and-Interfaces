import java.util.InputMismatchException;
import java.util.Scanner;

public class TempConverter {
    static Scanner sc = new Scanner(System.in);

    //? ANSI codes for colors
    public static final String RESET = "\033[0m";  // Reset color
    public static final String RED = "\033[0;31m";    
    public static final String GREEN = "\033[0;32m";  
    public static final String YELLOW = "\033[0;33m"; 
    public static final String BLUE = "\033[0;34m";   
    public static final String CYAN = "\033[0;36m";  
    
    //? Conversion methods
    static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9 / 5) + 32;
    }

    static double celsiusToKelvin(double celsius) {
        return celsius + 273.15;
    }

    static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    static double fahrenheitToKelvin(double fahrenheit) {
        return (fahrenheit - 32) * 5 / 9 + 273.15;
    }

    static double kelvinToCelsius(double kelvin) {
        return kelvin - 273.15;
    }

    static double kelvinToFahrenheit(double kelvin) {
        return (kelvin - 273.15) * 9 / 5 + 32;
    }

    //? Input and output methods
    static double readValue(String unit) {
        double value = 0;
        boolean valid = false;

        while (!valid) {
            System.out.print("Enter the temperature in degrees " + unit + " : ");
            try {
                value = sc.nextDouble();
                valid = true;
            } catch (InputMismatchException e) {
                System.out.println(RED + "Invalid input. Please enter a valid temperature." + RESET);
                sc.next();
            }
        }
        return value;
    }

    static void printResult(String fromUnit, String toUnit, double value, double result) {
        clearConsole();
        System.out.println("\n\n");
        System.out.println(CYAN + "CALCULATING..." + RESET);
        try {
            Thread.sleep(1200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        clearConsole();
        System.out.println("\n\n");
        System.out.println(RED + "RESULT: " + RESET + value + "°" + fromUnit + " = " + result + "°" + toUnit);
        System.out.println("\n\n");
    }

    //? Clear the console using ANSI escape codes
    static void clearConsole() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }

    static boolean askToContinue() {
        System.out.print("Do you want to perform another conversion? (y/n): ");
        String response = sc.next().trim().toLowerCase();
        return response.equals("y");
    }

}
