import java.util.List;

public class Sale {
    private static final double TAX_RATE = 0.15;

    public double calculateDiscount(double price) {
        if (price < 100) {
            return 0.05;
        } else if (price > 500) {
            return 0.10;
        } else {
            return 0.00;
        }
    }

    public double calculateTotal(Product product) {
        double subtotal = product.getSubtotal();
        double discount = calculateDiscount(product.getPrice());
        double discountAmount = subtotal * discount;
        double totalAfterDiscount = subtotal - discountAmount;
        double tax = totalAfterDiscount * TAX_RATE;
        return totalAfterDiscount + tax;
    }

    public void printReceipt(Product product) {
        double subtotal = product.getSubtotal();
        double discount = calculateDiscount(product.getPrice());
        double discountAmount = subtotal * discount;
        double total = calculateTotal(product);

        System.out.println("----- SubTotal -----");
        System.out.println(Utils.BLUE + "Product: " + Utils.RESET + product.getName());
        System.out.println(Utils.BLUE + "Price: " + Utils.RESET + "$" + String.format("%.2f", product.getPrice()));
        System.out.println(Utils.BLUE + "Quantity Sold: " + Utils.RESET + product.getQuantitySold());
        System.out.println(Utils.BLUE + "Subtotal: " + Utils.RESET + "$" + String.format("%.2f", subtotal));
        System.out.println(Utils.BLUE + "Discount: " + Utils.RESET + (discount * 100) + "%");
        System.out.println(Utils.BLUE + "Discount Amount: " + Utils.RESET + "$" + String.format("%.2f", discountAmount));
        System.out.println(Utils.BLUE + "Total After Discount: " + Utils.RESET + "$" + String.format("%.2f", subtotal - discountAmount));
        System.out.println(Utils.BLUE + "Tax (15%): " + Utils.RESET + "$" + String.format("%.2f", (subtotal - discountAmount) * TAX_RATE));
        System.out.println(Utils.GREEN + "SubTotal: " + Utils.RESET + "$" + String.format("%.2f", total));
        System.out.println("--------------------");
    }

    public void printAllReceipts(List<Product> products) {
        if (products.isEmpty()) {
            System.out.println(Utils.RED + "No hay productos para imprimir factura." + Utils.RESET);
            return;
        }

        double grandTotal = 0;

        for (Product product : products) {
            printReceipt(product);
            grandTotal += calculateTotal(product);
        }

        System.out.println("--------- TOTAL ---------");
        System.out.println(Utils.GREEN + "Total: " + Utils.RESET + "$" + String.format("%.2f", grandTotal));
        System.out.println("-------------------------");
    }
}
