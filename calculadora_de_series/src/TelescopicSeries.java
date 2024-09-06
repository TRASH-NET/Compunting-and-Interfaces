public class TelescopicSeries extends Serie {

    public TelescopicSeries(int limiteSuperior) {
        super(limiteSuperior);
    }

    @Override
    public double calculateSeriesSum() {
        return 1 - (1.0 / (upperLimit + 1));
    }
}