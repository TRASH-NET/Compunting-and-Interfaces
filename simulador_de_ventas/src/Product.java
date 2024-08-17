public class Product {

    private String name;
    private double price;
    private int quantitySold;

    public Product(String name, double price, int quantitySold) {
        setName(name);
        setPrice(price);
        setQuantitySold(quantitySold);
    }

    // ? Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        this.name = name;
    }

    public double getPrice() {

        return price;
    }

    public void setPrice(double price) {
        if (price <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        this.price = price;
    }

    public int getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(int quantitySold) {
        if (quantitySold < 0) {
            throw new IllegalArgumentException("Quantity sold must be greater than or equal to 0");
        }
        this.quantitySold = quantitySold;
    }

    public double getSubtotal() {
        return price * quantitySold;
    }

    public String toString() {
        return "{\n" +
                "    \"name\": \"" + name + "\",\n" +
                "    \"price\": " + price + ",\n" +
                "    \"quantitySold\": " + quantitySold + "\n" +
                "}";
    }
}