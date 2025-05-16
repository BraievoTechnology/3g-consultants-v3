const LocationMap = () => {
  // Company coordinates for 3G Consultants (Pvt) Ltd
  const position: [number, number] = [6.8687325, 79.9048112];
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9062244525847!2d${position[1]}!3d${position[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a27ac7bee09%3A0x3a114f5133bf768a!2s3G%20Consultants%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1699386547979!5m2!1sen!2slk`}
        width="100%"
        height="100%"
        style={{
          border: 0,
        }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="3G Consultants Location"
      />
    </div>
  );
};
export default LocationMap;
