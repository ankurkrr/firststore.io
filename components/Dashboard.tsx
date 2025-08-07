import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
}

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Beauty', 'Kids', 'Decor', 'Fitness'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Fortune Basmati Rice (5kg)',
      description: 'Premium long grain',
      price: 399,
      originalPrice: 460,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/b4af529d3863ed489a9f50c12382756a4b6d49f6?width=272'
    },
    {
      id: 2,
      name: 'Amul Gold Milk',
      description: 'Full Cream | 1L',
      price: 64,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/41878e45041b87b25a1a43faf7e04a07c2121540?width=272'
    },
    {
      id: 3,
      name: 'Lay\'s Magic Masala',
      description: 'Spicy, crispy snack | 52g',
      price: 20,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/155e8f52f2c8f26155a128c53f8474f3a1b241ca?width=272'
    },
    {
      id: 4,
      name: 'Fresh Tomatoes',
      description: '500g | Locally sourced',
      price: 19,
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/d4a52c7d0ce3cc503cbc795b49056402471bb103?width=360'
    }
  ];

  const renderStatusBar = () => (
    <View style={styles.statusBar}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      <View style={styles.statusIcons}>
        <View style={styles.signalBars}>
          <View style={[styles.bar, { height: 12 }]} />
          <View style={[styles.bar, { height: 16 }]} />
          <View style={[styles.bar, { height: 8 }]} />
          <View style={[styles.bar, { height: 4 }]} />
        </View>
        <Ionicons name="wifi" size={16} color={Colors.dark} />
        <View style={styles.battery}>
          <View style={styles.batteryLevel} />
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationSection}>
        <View style={styles.avatar} />
        <View style={styles.locationInfo}>
          <Text style={styles.deliveryText}>Delivering to</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>Shiv Vihar, Palwal</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.text} />
          </View>
        </View>
      </View>
      <Ionicons name="notifications" size={24} color={Colors.primary} />
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={20} color={Colors.text} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Groceries, Makeup, toys, kids collection"
          placeholderTextColor={Colors.lightGray}
        />
      </View>
    </View>
  );

  const renderHeroBanner = () => (
    <View style={styles.bannerContainer}>
      <Image
        source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/cf3da88aea65f21ccca9adc8e5bef3421fda8c38?width=816' }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerIndicators}>
        <View style={[styles.indicator, styles.activeIndicator]} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>
    </View>
  );

  const renderCategoryFilters = () => (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === category && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>{item.description}</Text>
        <View style={styles.productFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            {item.originalPrice && (
              <View style={styles.originalPriceContainer}>
                <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                <View style={styles.strikethrough} />
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={12} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTrendingSection = () => (
    <View style={styles.trendingSection}>
      <View style={styles.trendingHeader}>
        <Text style={styles.trendingTitle}>Trending Near You!</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => `trending-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingProducts}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderStatusBar()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderSearchBar()}
        {renderHeroBanner()}

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>What Do You Need Today?</Text>
          {renderCategoryFilters()}
          
          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <View key={product.id} style={styles.productCardWrapper}>
                {renderProductCard({ item: product })}
              </View>
            ))}
          </View>
        </View>

        {renderTrendingSection()}
      </ScrollView>

      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 50,
    height: 44,
  },
  timeContainer: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '400',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 4,
    backgroundColor: Colors.dark,
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: 'rgba(22,22,22,0.35)',
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  batteryLevel: {
    flex: 1,
    backgroundColor: Colors.dark,
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#D9D9D9',
    borderRadius: 24,
  },
  locationInfo: {
    gap: 2,
  },
  deliveryText: {
    fontSize: 10,
    color: Colors.text,
    fontWeight: '400',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchIcon: {
    marginLeft: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 4,
    backgroundColor: Colors.gray,
    borderRadius: 2,
  },
  activeIndicator: {
    width: 20,
    backgroundColor: Colors.primary,
  },
  content: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryScroll: {
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  activeCategoryButton: {
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.gray,
  },
  activeCategoryText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  productCardWrapper: {
    width: (width - 48) / 2,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  productImageContainer: {
    backgroundColor: Colors.background,
    padding: 4,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '100%',
  },
  productInfo: {
    padding: 8,
    gap: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 18,
  },
  productDescription: {
    fontSize: 10,
    color: Colors.text,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  originalPriceContainer: {
    position: 'relative',
  },
  originalPrice: {
    fontSize: 8,
    color: Colors.text,
  },
  strikethrough: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.primary,
  },
  addButton: {
    width: 24,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingSection: {
    backgroundColor: Colors.primary,
    paddingVertical: 24,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  viewAllButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewAllText: {
    fontSize: 10,
    color: Colors.primary,
  },
  trendingProducts: {
    paddingHorizontal: 16,
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 134,
    height: 5,
    backgroundColor: Colors.dark,
    borderRadius: 100,
    marginVertical: 20,
  },
});
