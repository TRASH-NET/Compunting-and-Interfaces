import java.util.InputMismatchException;

public class App {
    public static void main(String[] args) {
        int option;
        boolean continueConversion = true;
        
        while (continueConversion) {
            System.out.println("\n\n");
            System.out.println(TempConverter.CYAN + "          ----------------------");
            System.out.println(TempConverter.CYAN + "         |TEMPERATURE CONVERTER|");
            System.out.println(TempConverter.CYAN + "          ---------------------" + TempConverter.RESET);
            System.out.println("Select the conversion you want to perform:\n");
            System.out.println("1. Convert degrees " + TempConverter.GREEN + "Celsius" + TempConverter.RESET + " to degrees " + TempConverter.BLUE + "Kelvin\n" + TempConverter.RESET);
            System.out.println("2. Convert degrees " + TempConverter.GREEN + "Celsius" + TempConverter.RESET + " to degrees " + TempConverter.RED + "Fahrenheit\n" + TempConverter.RESET);
            System.out.println("3. Convert degrees " + TempConverter.RED + " Fahrenheit" + TempConverter.RESET + " to degrees " + TempConverter.BLUE + "Kelvin\n" + TempConverter.RESET);
            System.out.println("4. Convert degrees " + TempConverter.RED + " Fahrenheit" + TempConverter.RESET + " to degrees " + TempConverter.GREEN + "Celsius\n" + TempConverter.RESET);
            System.out.println("5. Convert degrees " + TempConverter.BLUE + " Kelvin" + TempConverter.RESET + " to degrees " + TempConverter.GREEN + "Celsius\n" + TempConverter.RESET);
            System.out.println("6. Convert degrees " + TempConverter.BLUE + " Kelvin" + TempConverter.RESET + " to degrees " + TempConverter.RED + "Fahrenheit\n" + TempConverter.RESET);
            System.out.println("7. Exit\n");
            System.out.println("-----------------------------------------------");
            
            option = getValidOption();

            double value;
            switch (option) {
                case 1:
                    value = TempConverter.readValue("Celcius");
                    TempConverter.printResult(TempConverter.GREEN+ "C" + TempConverter.RESET, TempConverter.BLUE + "K" + TempConverter.RESET, value, TempConverter.celsiusToKelvin(value));
                    break;
                case 2:
                    value = TempConverter.readValue("Celcius");
                    TempConverter.printResult(TempConverter.GREEN + "C" + TempConverter.RESET, TempConverter.RED + "F" + TempConverter.RESET, value, TempConverter.celsiusToFahrenheit(value));
                    break;
                case 3:
                    value = TempConverter.readValue("Fahrenheit");
                    TempConverter.printResult(TempConverter.RED + "F" + TempConverter.RESET, TempConverter.BLUE + "K" + TempConverter.RESET, value, TempConverter.fahrenheitToKelvin(value));
                    break;
                case 4:
                    value = TempConverter.readValue("Fahrenheit");
                    TempConverter.printResult(TempConverter.RED + "F" + TempConverter.RESET, TempConverter.GREEN + "C" + TempConverter.RESET, value, TempConverter.fahrenheitToCelsius(value));
                    break;
                case 5:
                    value = TempConverter.readValue("Kelvin");
                    TempConverter.printResult(TempConverter.BLUE + "K" + TempConverter.RESET, TempConverter.GREEN + "C" + TempConverter.RESET, value, TempConverter.kelvinToCelsius(value));
                    break;
                case 6:
                    value = TempConverter.readValue("Kelvin");
                    TempConverter.printResult(TempConverter.BLUE + "K" + TempConverter.RESET, TempConverter.RED + "F" + TempConverter.RESET, value, TempConverter.kelvinToFahrenheit(value));
                    break;
                case 7:
                    System.out.println("\n\n");
                    System.out.println(TempConverter.GREEN + "------ Exiting the program. -------" + TempConverter.RESET);
                    continueConversion = false;
                    break;
                default:
                    System.out.println(TempConverter.RED + "Invalid option, please try again." + TempConverter.RESET);
            }
            if (option != 7) {
                continueConversion = TempConverter.askToContinue();
            }
            System.out.println();
        }
    }

    //? Method to get a valid menu option from user
    private static int getValidOption() {
        int option = 0;
        boolean valid = false;
        while (!valid) {
            System.out.print("Select your choice: ");
            try {
                option = TempConverter.sc.nextInt();
                if (option < 1 || option > 7) {
                    System.out.println(TempConverter.RED + "Invalid option. Please enter a number between 1 and 7." + TempConverter.RESET);
                } else {
                    valid = true;
                }
            } catch (InputMismatchException e) {
                System.out.println(TempConverter.RED + "Invalid input. Please enter a valid number." + TempConverter.RESET);
                TempConverter.sc.next();
            }
        }
        return option;
    }
}
