public class ExponentialSeries extends Serie {
    private double base;

    public ExponentialSeries(int upperLimit, double base) {
        super(upperLimit);
        if (base < 0) {
            throw new IllegalArgumentException("La base de la serie exponencial no puede ser negativa.");
        }
    
        if (Double.isInfinite(base) || Double.isNaN(base)) {
            throw new IllegalArgumentException("La base no puede ser infinita o NaN.");
        }

        this.base = base;
    }

    @Override
    public double calculateSeriesSum() {
        double sum = 0;
        for (int i = 0; i < upperLimit; i++) {
            sum += Math.pow(base, i);
        }
        return sum;
    }
}