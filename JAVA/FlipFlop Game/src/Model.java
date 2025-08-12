public class Model {

    private static final int INITIAL_VALUE = 0;
    private int scor;

    public Model(){
        scor = INITIAL_VALUE;
    }

    public void add(){
        scor++;
    }

    public void subb(){
        scor--;
    }

    public String getScore(){
        return String.valueOf(scor);
    }

    public void setScore(int score){
        scor = score;
    }


}
