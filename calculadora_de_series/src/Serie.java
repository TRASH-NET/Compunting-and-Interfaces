public abstract class Serie {
    protected int upperLimit;

    public Serie(int upperLimit) {
        if (upperLimit <= 0) {
            throw new IllegalArgumentException("El límite superior debe ser un número positivo.");
        }
        this.upperLimit = upperLimit;
    }

    public abstract double calculateSeriesSum();
}