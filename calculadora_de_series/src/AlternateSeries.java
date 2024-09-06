public class AlternateSeries extends Serie {
    private double firstTerm;
    private double difference;

    public AlternateSeries(int upperLimit, double firstTerm, double difference) {
        super(upperLimit);
        this.firstTerm = firstTerm;
        this.difference = difference;
    }

    @Override
    public double calculateSeriesSum() {
        double sum = 0;

        if (Double.isInfinite(difference) || Double.isNaN(difference)) {
            throw new IllegalArgumentException("La diferencia no puede ser infinita o NaN.");
        }   

        for (int i = 0; i < upperLimit; i++) {
            sum += Math.pow(-1, i) * (firstTerm + i * difference);
        }

        return sum;
    }
}