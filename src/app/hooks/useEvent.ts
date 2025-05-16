"use client";
import { useState, useEffect, useCallback } from "react";
import { Event, eventService } from "@/app/services/api/eventService";

export const useEvent = (id: number) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(id);
      setEvent(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent().then((r) => {
      console.log(r);
    });
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  };
};
