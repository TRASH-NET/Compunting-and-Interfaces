public class GeometricSerie extends Serie {
    
    private double ratio;
    private double firstTerm;

    public GeometricSerie(int upperLimit, double ratio, double firstTerm) {
        super(upperLimit);

        if (ratio == 0) {
            throw new IllegalArgumentException("La razón de la serie geométrica no puede ser cero.");
        }
        if (firstTerm <= 0) {
            throw new IllegalArgumentException("El primer término de la serie geométrica debe ser positivo.");
        }

        this.ratio = ratio;
        this.firstTerm = firstTerm;
    }

    @Override
    public double calculateSeriesSum() {
        if (ratio == 1) {
            return firstTerm * upperLimit;
        }

        double numerator = firstTerm * (1 - Math.pow(ratio, upperLimit));
        double denominator = 1 - ratio;

        if (denominator == 0) {
            throw new ArithmeticException("La razón de la serie geométrica no puede ser (1) para este caso.");
        }

        return numerator / denominator;
    }
}