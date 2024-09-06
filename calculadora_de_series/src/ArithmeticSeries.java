public class ArithmeticSeries extends Serie {
    private int difference;
    private int firstTerm;

    public ArithmeticSeries(int upperLimit, int difference, int firstTerm) {
        super(upperLimit);

        if (difference == 0) {
            throw new IllegalArgumentException("La diferencia en una serie aritmética no puede ser cero.");
        }
        if (firstTerm <= 0) {
            throw new IllegalArgumentException("El primer término de la serie aritmética debe ser positivo.");
        }

        this.difference = difference;
        this.firstTerm = firstTerm;
    }

    @Override
    public double calculateSeriesSum() {
        int n = (upperLimit - firstTerm) / difference + 1;
        int lastTerm = firstTerm + (n - 1) * difference;
        return (n / 2.0) * (firstTerm + lastTerm);
    }
}