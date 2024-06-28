import { ref, onMounted, watch} from 'vue';
import axios from 'axios';

export function useFetch(url : any) {
  const data = ref<number | null>(null);
  const error = ref<string | null>(null);
  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        data.value = res.data;
      })
      .catch((err) => {
        error.value = err.message;
      });
  };
  onMounted(fetchData);
  watch(() => url, fetchData);
  return { data, error };
}