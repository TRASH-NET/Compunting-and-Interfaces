import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class BestSalesSimulator {

    public static List<Product> products = new ArrayList<>();
    public static Sale sale = new Sale();

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        boolean keepRunning = true;

        while (keepRunning) {
            Utils.clearConsole();
            System.out.println(Utils.CYAN + "             ------------------------------");
            System.out.println("            | EL MEJOR SIMULADOR DE VENTAS |");
            System.out.println("             ------------------------------" + Utils.RESET + "\n");
            System.out.println(Utils.YELLOW + "1. " + Utils.RESET + "Ingresar un producto");
            System.out.println(Utils.YELLOW + "2. " + Utils.RESET + "Ver productos ingresados");
            System.out.println(Utils.YELLOW + "3. " + Utils.RESET + "Modificar un producto");
            System.out.println(Utils.YELLOW + "4. " + Utils.RESET + "Eliminar un producto");
            System.out.println(Utils.YELLOW + "5. " + Utils.RESET + "Imprimir factura");
            System.out.println(Utils.YELLOW + "6. " + Utils.RESET + "Salir" + "\n");
            System.out.print(Utils.GREEN + "¿Qué desea realizar?" + Utils.RESET + "\n\n");

            int option = Utils.getValidOption(scanner, 1, 6);

            scanner.nextLine();

            switch (option) {
                case 1:
                    addProduct(scanner);
                    break;
                case 2:
                    showProducts(products);
                    break;
                case 3:
                    modifyProduct(scanner, products);
                    break;
                case 4:
                    deleteProduct(scanner, products);
                    break;
                case 5:
                    sale.printAllReceipts(products);
                    break;
                case 6:
                    System.out.println(Utils.GREEN + "¡Gracias por usar el mejor simulador de ventas!" + Utils.RESET);
                    return;
                default:
                    System.out.println(Utils.RED + "Opción inválida, por favor intente de nuevo." + Utils.RESET);
            }

            if (keepRunning) {
                keepRunning = Utils.askToContinue(scanner);
            }
        }
    }

    public static void addProduct(Scanner scanner) {
        String name = Utils.getValidStringInput(scanner, "Ingrese el nombre del producto: ");
        double price = Utils.getValidDoubleInput(scanner, "Ingrese el precio del producto: ");
        int quantitySold = Utils.getValidIntInput(scanner, "Ingrese la cantidad vendida del producto: ");

        try {
            Product newProduct = new Product(name, price, quantitySold);
            products.add(newProduct);
            System.out.println(Utils.GREEN + "Producto agregado exitosamente." + Utils.RESET);
        } catch (IllegalArgumentException e) {
            System.out.println(Utils.RED + "Error al agregar el producto: " + e.getMessage() + Utils.RESET);
        }
    }

    public static void showProducts(List<Product> products) {
        if (products.isEmpty()) {
            System.out.println(Utils.YELLOW + "No hay productos ingresados." + Utils.RESET);
        } else {
            System.out.println(Utils.CYAN + "----- Productos Ingresados -----" + Utils.RESET);
            for (Product product : products) {
                System.out.println(product);
                System.out.println();
            }
            System.out.println(Utils.CYAN + "-------------------------------" + Utils.RESET);
        }
    }

    public static void modifyProduct(Scanner scanner, List<Product> products) {
        if (products.isEmpty()) {
            System.out.println(Utils.YELLOW + "No hay productos ingresados para modificar." + Utils.RESET);
            return;
        }
    
        System.out.println(Utils.CYAN + "----- Modificar Producto -----" + Utils.RESET);
        for (int i = 0; i < products.size(); i++) {
            System.out.println((i + 1) + ". " + products.get(i));
        }
        
        int productIndex = Utils.getValidIntInput(scanner, "Ingrese el número del producto a modificar: ");
        if (productIndex < 1 || productIndex > products.size()) {
            System.out.println(Utils.RED + "Número de producto inválido. Inténtelo de nuevo." + Utils.RESET);
            return;
        }
    
        Product productToModify = products.get(productIndex - 1);
    
        System.out.println(Utils.GREEN + "Modificando producto: " + productToModify + Utils.RESET);
    
        String newName = Utils.getValidStringInput(scanner, "Ingrese el nuevo nombre del producto: ");
        if (!newName.isEmpty()) {
            productToModify.setName(newName);
        }
    
        double newPrice = Utils.getValidDoubleInput(scanner, "Ingrese el nuevo precio del producto: ");
        if (newPrice > 0) {
            productToModify.setPrice(newPrice);
        }
    
        int newQuantitySold = Utils.getValidIntInput(scanner, "Ingrese la nueva cantidad vendida del producto: ");
        if (newQuantitySold >= 0) {
            productToModify.setQuantitySold(newQuantitySold);
        }
    
        System.out.println(Utils.GREEN + "Producto modificado exitosamente." + Utils.RESET);
    }

    public static void deleteProduct(Scanner scanner, List<Product> products) {
        if (products.isEmpty()) {
            System.out.println(Utils.RED + "No hay productos para eliminar." + Utils.RESET);
            return;
        }
    
        System.out.println("Seleccione el número del producto que desea eliminar:");
        for (int i = 0; i < products.size(); i++) {
            Product product = products.get(i);
            System.out.println((i + 1) + ". " + product);
        }
    
        int index = 0;
        boolean validSelection = false;
        while (!validSelection) {
            System.out.print("Ingrese el número del producto: ");
            String input = scanner.nextLine();
    
            if (input.isEmpty()) {
                System.out.println(Utils.RED + "La entrada no puede estar vacía. Inténtelo de nuevo." + Utils.RESET);
                continue;
            }
    
            try {
                index = Integer.parseInt(input) - 1;
                if (index < 0 || index >= products.size()) {
                    System.out.println(Utils.RED + "Selección inválida. Por favor, ingrese un número válido." + Utils.RESET);
                } else {
                    validSelection = true;
                }
            } catch (NumberFormatException e) {
                System.out.println(Utils.RED + "Entrada inválida. Por favor, ingrese un número válido." + Utils.RESET);
            }
        }
    
        products.remove(index);
        System.out.println(Utils.GREEN + "Producto eliminado exitosamente." + Utils.RESET);
    }
    

}
