import matplotlib
matplotlib.use('agg')

import pandas as pd
import matplotlib.pyplot as plt
from fpdf import FPDF

def plot_data(data, summary):
    # Load your data from the CSV file
    df = pd.read_csv(data)

    # Create PDF
    pdf = FPDF()

    # Add summary on the first page
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Summary', ln=True)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, summary)

    # Donut Chart for Top Channels by Conversions
    top_conversion_channels = df.groupby('channel')['conversions'].sum().nlargest(5)
    plt.figure(figsize=(8, 8))
    plt.pie(df.groupby('channel')['conversions'].sum().nlargest(5), labels=top_conversion_channels.index, autopct="%1.1f%%")
    plt.title("Top Channels by Conversions")
    plt.savefig('top_channels_by_conversions.png')  # Save the plot as an image
    plt.close()  # Close the plot to prevent it from being displayed
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Top Channels by Conversions', ln=True)
    pdf.image('top_channels_by_conversions.png', x=10, y=10, w=90)

    # Bar Chart for Clicks by Channel
    plt.figure(figsize=(8, 8))
    plt.bar(df['channel'], df['clicks'])
    plt.xlabel("Channel")
    plt.ylabel("Clicks")
    plt.title("Clicks by Channel")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig('clicks_by_channel.png')  # Save the plot as an image
    plt.close()  # Close the plot to prevent it from being displayed
    pdf.image('clicks_by_channel.png', x=110, y=10, w=90)

    # Line Chart for Website Traffic Over Time
    plt.figure(figsize=(8, 8))
    plt.plot(df['date'], df['website_visitors'])
    plt.xlabel("Date")
    plt.ylabel("Website Visitors")
    plt.title("Website Traffic Over Time")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig('website_traffic_over_time.png')  # Save the plot as an image
    plt.close()  # Close the plot to prevent it from being displayed
    pdf.image('website_traffic_over_time.png', x=10, y=110, w=90)

    # Heatmap for Bounce Rate by Channel and Device
    pivot_table = pd.pivot_table(df, values='bounce_rate', index=['channel'], columns=['campaign'])
    plt.figure(figsize=(8, 8))
    plt.title('Bounce Rate by Channel and Device')
    plt.pcolor(pivot_table, vmin=0, vmax=100, cmap='RdBu_r')
    plt.xlabel('Device')
    plt.ylabel('Channel')
    plt.tight_layout()
    plt.savefig('bounce_rate_heatmap.png')  # Save the plot as an image
    plt.close()  # Close the plot to prevent it from being displayed
    pdf.image('bounce_rate_heatmap.png', x=110, y=110, w=90)

    # Save PDF
    pdf.output('marketing_insights.pdf')

# Example usage
#plot_data('marketing_site_traffic.csv', "Strai is a chatbot expert in marketing and branding strategies. It provides insights into top channels, clicks by channel, website traffic over time, and bounce rate by channel and device.")
