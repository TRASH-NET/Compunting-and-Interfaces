import java.util.Scanner;


public class App {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        boolean keepRunning = true;

        while (keepRunning) {
            Utils.clearConsole();
            System.out.println(Utils.CYAN + "             -----------------------");
            System.out.println("            | CALCULADORA DE SERIES |");
            System.out.println("             -----------------------" + Utils.RESET + "\n");
            System.out.println("\n Seleccione la serie que desea calcular \n");
            System.out.println(Utils.YELLOW + "1. " + Utils.RESET + "Serie Aritmética");
            System.out.println(Utils.YELLOW + "2. " + Utils.RESET + "Serie Geométrica");
            System.out.println(Utils.YELLOW + "3. " + Utils.RESET + "Serie Alternada");
            System.out.println(Utils.YELLOW + "4. " + Utils.RESET + "Serie Exponencial");
            System.out.println(Utils.YELLOW + "5. " + Utils.RESET + "Serie Telescópica");
            System.out.println(Utils.YELLOW + "6. " + Utils.RESET + "Salir" + "\n");
            System.out.print(Utils.GREEN + "¿Qué desea realizar?" + Utils.RESET + "\n\n");

            int option = Utils.getValidOption(scanner, 1, 6);

            scanner.nextLine();

            switch (option) {
                case 1:
                    int firstTermA = Utils.getValidInteger(scanner, "Ingrese el primer término de la serie aritmética: ", 1, Integer.MAX_VALUE);
                    int differenceA = Utils.getValidInteger(scanner, "Ingrese la diferencia de la serie aritmética: ", Integer.MIN_VALUE, Integer.MAX_VALUE);
                    while (differenceA == 0) {
                        System.out.println(Utils.RED + "La diferencia en una serie aritmética no puede ser cero. Por favor, ingrese un valor diferente." + Utils.RESET);
                        differenceA = Utils.getValidInteger(scanner, "Ingrese la diferencia de la serie aritmética: ", Integer.MIN_VALUE, Integer.MAX_VALUE);
                    }
                    
                    int upperLimitA = Utils.getValidInteger(scanner, "Ingrese el límite superior de la serie aritmética: ", 1, Integer.MAX_VALUE);
                    
                    try {
                        ArithmeticSeries arithmeticSeries = new ArithmeticSeries(upperLimitA, differenceA, firstTermA);
                        System.out.println("La suma de la serie aritmética es: " + arithmeticSeries.calculateSeriesSum());
                    } catch (IllegalArgumentException e) {
                        System.out.println(Utils.RED + e.getMessage() + Utils.RESET);
                    }
                    break;
                case 2:
                    double firstTermG = Utils.getValidPositiveDouble(scanner, "Ingrese el primer término de la serie geométrica: ");
        
                    double ratioG = Utils.getValidDouble(scanner, "Ingrese la razón de la serie geométrica: ", -1_000_000_000, 1_000_000_000);
                    
                    while (ratioG == 1) {
                        System.out.println(Utils.RED + "La razón de la serie geométrica no puede ser 1. Por favor, ingrese un valor diferente." + Utils.RESET);
                        ratioG = Utils.getValidDouble(scanner, "Ingrese la razón de la serie geométrica: ", -1_000_000_000, 1_000_000_000);
                    }
                    
                    int limitG = Utils.getValidInteger(scanner, "Ingrese el límite superior de la serie geométrica: ", 1, Integer.MAX_VALUE);
                    
                    try {
                        GeometricSerie geometricSerie = new GeometricSerie(limitG, ratioG, firstTermG);
                        System.out.println("La suma de la serie geométrica es: " + geometricSerie.calculateSeriesSum());
                    } catch (IllegalArgumentException e) {
                        System.out.println(Utils.RED + e.getMessage() + Utils.RESET);
                    } 

                    break;
                case 3:
                    double firstTermAlt = Utils.getValidDouble(scanner, "Ingrese el primer término de la serie alternada: ", -1_000_000_000, 1_000_000_000);
                    double differenceAlt = Utils.getValidDouble(scanner, "Ingrese la diferencia de la serie alternada: ", -1_000_000_000, 1_000_000_000);
            
                while (Double.isInfinite(differenceAlt) || Double.isNaN(differenceAlt)) {
                    System.out.println(Utils.RED + "La diferencia no puede ser infinita o NaN. Por favor, ingrese un valor válido." + Utils.RESET);
                    differenceAlt = Utils.getValidDouble(scanner, "Ingrese la diferencia de la serie alternada: ", -1_000_000_000, 1_000_000_000);
                }
            
                int limitAlt = Utils.getValidInteger(scanner, "Ingrese el límite superior de la serie alternada: ", 1, Integer.MAX_VALUE);
            
                try {
                    AlternateSeries alternateSeries = new AlternateSeries(limitAlt, firstTermAlt, differenceAlt);
                    System.out.println("La suma de la serie alternada es: " + alternateSeries.calculateSeriesSum());
                } catch (IllegalArgumentException e) {
                    System.out.println(Utils.RED + e.getMessage() + Utils.RESET);
                }
                    break;
                case 4:
                    double baseE = Utils.getValidDouble(scanner, "Ingrese la base de la serie exponencial: ", 0, 1_000_000_000);

                    while (Double.isInfinite(baseE) || Double.isNaN(baseE)) {
                        System.out.println(Utils.RED + "La base no puede ser infinita o NaN. Por favor, ingrese un valor válido." + Utils.RESET);
                        baseE = Utils.getValidDouble(scanner, "Ingrese la base de la serie exponencial: ", 0, 1_000_000_000);
                    }
                
                    int limitE = Utils.getValidInteger(scanner, "Ingrese el límite superior de la serie exponencial: ", 1, Integer.MAX_VALUE);
                
                    try {
                        ExponentialSeries exponentialSeries = new ExponentialSeries(limitE, baseE);
                        System.out.println("La suma de la serie exponencial es: " + exponentialSeries.calculateSeriesSum());
                    } catch (IllegalArgumentException e) {
                        System.out.println(Utils.RED + e.getMessage() + Utils.RESET);
                    }
                    break;
                case 5:
                    int limitT = Utils.getValidInteger(scanner, "Ingrese el límite superior de la serie telescópica: ", 1, Integer.MAX_VALUE);
                    try {
                        TelescopicSeries telescopicSeries = new TelescopicSeries(limitT);
                        System.out.println("La suma de la serie telescópica es: " + telescopicSeries.calculateSeriesSum());
                    } catch (IllegalArgumentException e) {
                        System.out.println(Utils.RED + e.getMessage() + Utils.RESET);
                    }

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