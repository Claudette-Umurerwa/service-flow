
import useLocalStorage from "./useLocalStorage";
import initialRequests from "../data/requests";

function useRequests() {
  const [requests, setRequests] = useLocalStorage(
    "workflow-requests",
    initialRequests
  );

  // function addRequest(newRequest) {
  //   setRequests((previousRequests) => [
  //     newRequest,
  //     ...previousRequests,
  //   ]);
  // }
  function addRequest(newRequest) {
  setRequests((previousRequests) => {
    const highestId = previousRequests.reduce(
      (highest, request) => Math.max(highest, Number(request.id) || 0),
      0
    );

    const nextId = highestId + 1;

    return [
      {
        ...newRequest,
        id: nextId,
      },
      ...previousRequests,
    ];
  });
}

  function updateRequest(id, updatedFields) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id
          ? { ...request, ...updatedFields }
          : request
      )
    );
  }

  function deleteRequest(id) {
    setRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== id)
    );
  }

  return {
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
  };
}

export default useRequests;
